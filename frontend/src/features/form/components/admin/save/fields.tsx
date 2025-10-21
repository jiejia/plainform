'use client'

import React from "react";
import { Field } from "@/features/form/types/field";
import { DndDroppable } from "@/features/core/components/shared/dnd-droppable";
import { DndSortableItem } from "@/features/core/components/shared/dnd-sortable-item";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import clsx from "clsx";
import { FieldError } from "@/features/form/types/save/field-error";
import { useTranslations } from 'next-intl';

export default function Fields({ fields, setFields, setTabSelectedKey, setFieldErrors }: { fields: Field[], setFields: (fields: Field[]) => void, setTabSelectedKey: (key: string | number) => void, setFieldErrors: (errors: FieldError) => void }) {

    const t = useTranslations('form');
    const handleFieldClick = (
        e: React.MouseEvent<HTMLElement>,
        index: number
    ) => {
        const updatedFields = fields.map((field: Field, key: number) => {
            if (key == index) {
                return { ...field, active: true };
            } else {
                return { ...field, active: false };
            }
        });


        setFields(updatedFields);
        setTabSelectedKey("field-property");
        setFieldErrors({
            title: '',
            description: '',
            regex: '',
        });
    };


    return (
        <DndDroppable id={"fields-" + fields.length} className="h-full">
            <SortableContext items={fields.map((_, index) => `field-${index}`)} strategy={verticalListSortingStrategy}>
                <ul id="fields" className="grid grid-cols-1 gap-2 h-full content-start">
                    {fields.map((field, index) => (
                        <DndSortableItem
                            id={"field-" + index}
                            className={clsx("flex items-center justify-between p-3 rounded-lg border border-gray-400 hover:bg-gray-100 transition-colors", { "outline -outline-offset-2 outline-2 outline-primary": fields[index].active })}
                            key={index}
                            onClick={(e) => handleFieldClick(e, index)}
                            title={field.title}
                        >
                            <span className="text-sm font-medium text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap">{field.title}</span>
                            <span className="text-xs text-gray-500 px-2 py-1 rounded-full">{t(field.control_type)}</span>
                        </DndSortableItem>
                    ))}
                </ul>
            </SortableContext>
        </DndDroppable>
    )
}