'use client'

import Scroll from "@/features/core/components/shared/scroll";
import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Tab, Tabs } from "@heroui/react";
import { ListPlus, Settings, Settings2, StickyNote, Trash2 } from "lucide-react"
import Controls from "./controls";
import Fields from "./fields";
import FormSetting from "./form-setting"
import FieldSetting from "./fields-setting/index"
import { Control } from "@/features/form/types/control";
import { Field } from "@/features/form/types/field";
import DndWrapper from "@/features/core/components/shared/dnd-wrapper";
import { DragStartEvent, DragEndEvent, DragMoveEvent } from "@dnd-kit/core";
import Overlay from "./overlay";
import Recycle from "./recycle";
import {v4 as uuidV4} from "uuid";
import { Form } from "@/features/form/types/form";
import { DraggableItem } from "@/features/form/types/draggable-item";
import { create, update } from "@/features/form/actions/admin/form-action";
import { msg } from "@/features/core/utils/ui";
import { useRouter } from "next/navigation";
import { saveFormValidator } from "@/features/form/validators/save-form-validator";
import { saveFormFieldValidator } from "@/features/form/validators/save-form-field-validator";
import { FormError } from "@/features/form/types/save/form-error";
import { FieldError } from "@/features/form/types/save/field-error";
import { useTranslations } from "next-intl";

export default function Save({ initialControls, initialFields, initialForm }: { initialControls: Control[], initialFields: Field[], initialForm: Form }) {

    const t = useTranslations('form');
    const router = useRouter();

    const [fields, setFields] = useState<Field[]>(initialFields);
    const [activeItem, setActiveItem] = useState<DraggableItem | null>(null);
    const [overItem, setOverItem] = useState<DraggableItem | null>(null);
    const [tabSelectedKey, setTabSelectedKey] = useState<string | number>("form-property");
    const [form, setForm] = useState<Form>(initialForm);

    const [isPending, setIsPending] = useState(false);

    const [errors, setErrors] = useState<FormError>({
        title: '',
        description: '',
    });

    const [fieldErrors, setFieldErrors] = useState<FieldError>({
        title: '',
        description: '',
        regex: '',
        // config: {
        //     options: {
        //         default_options: [],
        //     },
        // },
    });

    const handleSubmit = async () => {
        setIsPending(true);

        // validate form setting
        const result = saveFormValidator({
            title: form.title,
            description: form.description,
        });
        if (!result.success) {
            const { fieldErrors } = result.error.flatten();
            setErrors({
                title: fieldErrors.title?.[0] ?? '',
                description: fieldErrors.description?.[0] ?? '',
            });
            setIsPending(false);
            setTabSelectedKey('form-property');
            return;
        }

        // validate field setting
        for (const field of fields) {
            const result = saveFormFieldValidator({
                title: field.title,
                description: field.description,
                regex: field.regex,
                // config: field.config,
            });
            if (!result.success) {  
                const { fieldErrors } = result.error.flatten();
                setFieldErrors({
                    title: fieldErrors.title?.[0] ?? '',
                    description: fieldErrors.description?.[0] ?? '',
                    regex: fieldErrors.regex?.[0] ?? '',
                });

                // set field active
                setFields(fields.map(item => field.uuid === item.uuid ? { ...item, active: true } : {...item, active: false}));

                setIsPending(false);
                setTabSelectedKey('field-property');
                return;
            }
        }

        // get form data
        const formData = {
            ...form,
            fields: fields
        };

        // create or update form
        let res;
        if (form.id) {
            res = await update(form.id, formData);
        } else {
            res = await create(formData);
        }

        // if success, redirect to form list
        if (res.code === 0) {
            if (form.id) {
                msg(t('update_form_success'), '', 'success');
            } else {
                msg(t('create_form_success'), '', 'success');
            }   
            router.push(`/dashboard/form`);  
        } else {
            if (form.id) {
                msg(t('update_form_failed'), res.msg, 'warning');
            } else {
                msg(t('create_form_failed'), res.msg, 'warning');
            }
        }

        setIsPending(false);
    }


    // get draggable item
    const getDraggableItem = (currentId: string): DraggableItem => {
        let area = null;
        if (currentId.toString().includes("field")) {
            area = "field";
        } else if (currentId.toString().includes("control")) {
            area = "control";
        } else if (currentId.toString().includes("recycle")) {
            area = "recycle";
        }

        let id = currentId.split("-").pop();

        if (!id) {
            id = "0";
        }

        return {
            id: parseInt(id),
            area: area,
        };
    };

    const getInsertPosition = (activeRect: DOMRect, overRect: DOMRect) => {
        if (activeRect.bottom <= overRect.bottom) {
            return "before";
        }
        if (activeRect.top >= overRect.top) {
            return "after";
        }
        return "after";
    };

    const handleDragStart = (event: DragStartEvent) => {
        // get active item
        const { active } = event;

        setActiveItem(getDraggableItem(active.id.toString()));
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        const currentActiveItem = getDraggableItem(active.id.toString());
        setActiveItem(currentActiveItem);

        if (over) {
            const currentOverItem = getDraggableItem(over.id.toString());
            setOverItem(currentOverItem);
            console.log(currentActiveItem, currentOverItem);

            const activeRect = active.rect.current.translated;
            const overRect = over.rect;

            // drag control to field
            if (
                currentActiveItem.area == "control" &&
                currentOverItem.area == "field"
            ) {
                if (activeRect && overRect) {
                    const insertPosition = getInsertPosition(activeRect as DOMRect, overRect as DOMRect);
                    console.log(insertPosition);

                    const newFiledItems = [...fields];

                    const field: Field = {
                        uuid: uuidV4(),
                        control_id: initialControls[currentActiveItem.id].id,
                        control_name: initialControls[currentActiveItem.id].name,
                        control_type: initialControls[currentActiveItem.id].type,
                        active: false,
                        title: initialControls[currentActiveItem.id].config.title,
                        description: initialControls[currentActiveItem.id].config.description,
                        required: initialControls[currentActiveItem.id].config.required ?? false,
                        regex: initialControls[currentActiveItem.id].config.regex.value,
                        config: initialControls[currentActiveItem.id].config,
                        sort: 0,
                    };

                    if (insertPosition === "before") {
                        newFiledItems.splice(currentOverItem.id, 0, field);
                    } else {
                        newFiledItems.splice(currentOverItem.id + 1, 0, field);
                    }
                    setFields(newFiledItems);
                }
            }

            // drag field to field
            if (
                currentActiveItem.area == "field" &&
                currentOverItem.area == "field" &&
                currentActiveItem.id != currentOverItem.id
            ) {
                if (activeRect && overRect) {
                    const insertPosition = getInsertPosition(activeRect as DOMRect, overRect as DOMRect);
                    const newFiledItems = [...fields];
                    const [removed] = newFiledItems.splice(currentActiveItem.id, 1);
                    if (insertPosition === "before") {
                        if (currentActiveItem.id < currentOverItem.id) {
                            newFiledItems.splice(currentOverItem.id - 1, 0, removed);
                        } else {
                            newFiledItems.splice(currentOverItem.id, 0, removed);
                        }
                    } else {
                        if (currentActiveItem.id < currentOverItem.id) {
                            newFiledItems.splice(currentOverItem.id, 0, removed);
                        } else {
                            newFiledItems.splice(currentOverItem.id + 1, 0, removed);
                        }
                    }
                    setFields(newFiledItems);
                }
            }

            // drag field to recycle(remove field)
            if (
                currentActiveItem.area == "field" &&
                currentOverItem.area == "recycle"
            ) {
                // Prevent deletion if only one element remains
                if (fields.length <= 1) {
                    return; // Return directly, skip deletion
                }

                const newFiledItems = [...fields];
                const removedField = newFiledItems[currentActiveItem.id];
                newFiledItems.splice(currentActiveItem.id, 1);

                // If the deleted field was active, activate the first field
                if (removedField.active && newFiledItems.length > 0) {
                    newFiledItems[0] = {...newFiledItems[0], active: true};
                }

                setFields(newFiledItems);
            }
        }
    }

    const handleDragMove = (event: DragMoveEvent) => {

    }

    // only client side render
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <DndWrapper
            handleDragEnd={handleDragEnd}
            handleDragStart={handleDragStart}
            handleDragMove={handleDragMove}
        >
            <div
                className="grid  gap-4 grid-cols-[1fr] sm:grid-cols-[1fr_300px] xl:grid-cols-[300px_1fr_300px] grid-rows-[1fr_1fr_56px] sm:grid-rows-[1fr_56px] h-full">
                <Card className="xl:block hidden">
                    <CardHeader>
                        <h2 className="flex items-center space-x-2">
                            <ListPlus size={16} />
                            <span>{t('controls')}</span>
                        </h2>
                    </CardHeader>
                    <Divider />
                    <CardBody className="h-full">
                        <Scroll>
                            <Controls controls={initialControls} />
                        </Scroll>
                    </CardBody>
                </Card>
                <Card className="">
                    <CardHeader>
                        <h2 className="flex items-center space-x-2">
                            <StickyNote size={16} />
                            <span>{t('fields')}</span>
                        </h2>
                    </CardHeader>
                    <Divider />
                    <CardBody className="h-full">
                        <Scroll>
                            <Fields fields={fields} setFields={setFields} setTabSelectedKey={setTabSelectedKey} setFieldErrors={setFieldErrors} />
                        </Scroll>
                    </CardBody>
                    <CardFooter>
                        <Recycle />
                    </CardFooter>
                </Card>
                <Card>
                    <CardBody className="h-full">
                        <Tabs fullWidth size="md" selectedKey={tabSelectedKey} onSelectionChange={setTabSelectedKey}>
                            <Tab key="controls"
                                title={<div className="flex items-center space-x-1">
                                    <ListPlus size={16} />
                                    <span>{t('controls')}</span>
                                </div>}
                                className="xl:hidden block h-full"
                            >
                                <Scroll>
                                    <Controls controls={initialControls} />
                                </Scroll>
                            </Tab>
                            <Tab key="form-property"
                                title={<div className="flex items-center space-x-1">
                                    <Settings size={16} />
                                    <span>{t('form_settings')}</span>
                                </div>}
                                className="h-full">
                                <Scroll>
                                    <FormSetting form={form} setForm={setForm} errors={errors} setErrors={setErrors} />
                                </Scroll>
                            </Tab>
                            <Tab key="field-property"
                                title={<div className="flex items-center space-x-1">
                                    <Settings2 size={16} />
                                    <span>{t('field_settings')}</span>
                                </div>}
                                className="h-full"
                            >
                                <Scroll>
                                    <FieldSetting fields={fields} setFields={setFields} errors={fieldErrors} setFieldErrors={setFieldErrors} />
                                </Scroll>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
                <Card
                    className={"col-span-1 sm:col-span-2 xl:col-span-3"}
                >
                    <CardBody className="flex flex-row justify-center gap-2">
                        <Button className="w-auto" color="primary" radius="sm" size="sm" variant="flat">
                            {t('reset')}
                        </Button>
                        <Button className="w-auto" color="primary" size="sm" variant="shadow" radius="sm" onPress={handleSubmit} isLoading={isPending} disabled={isPending} >
                            {isPending ? t('submitting') : t('submit')}
                        </Button>
                    </CardBody>
                </Card>
            </div>
            {activeItem && (
                <Overlay
                    activeItem={activeItem}
                    fields={fields}
                    controls={initialControls}
                />
            )}
        </DndWrapper>
    );
}