'use client'

import Scroll from "@/features/core/components/shared/scroll";
import React from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Tab, Tabs } from "@heroui/react";
import {ListPlus,Settings,Settings2,StickyNote,Trash2} from "lucide-react"
import Controls from "./controls";
import Fields from "./fields";
import FormSetting from "./form-setting"
import FieldSetting from "./field-setting"
import { Control } from "@/features/form/types/control";
import { Field } from "@/features/form/types/field";

export default function Save({ controls, fields }: { controls: Control[], fields: Field[] }) {
    return (<div
        className="grid  gap-4 grid-cols-[1fr] sm:grid-cols-[1fr_300px] xl:grid-cols-[300px_1fr_300px] grid-rows-[1fr_1fr_56px] sm:grid-rows-[1fr_56px] h-full">
        <Card className="xl:block hidden">
            <CardHeader>
                <h2 className="flex items-center space-x-2">
                    <ListPlus size={16} />
                    <span>控件</span>
                </h2>
            </CardHeader>
            <Divider />
            <CardBody className="h-full">
                <Scroll>
                    <Controls controls={controls} />
                </Scroll>
            </CardBody>
        </Card>
        <Card className="">
            <CardHeader>
                <h2 className="flex items-center space-x-2">
                    <StickyNote size={16} />
                    <span>字段</span>
                </h2>
            </CardHeader>
            <Divider />
            <CardBody className="h-full">
                <Scroll>
                    <Fields fields={fields} />
                </Scroll>
            </CardBody>
            <CardFooter>
                <div
                    id="recycle"
                    className="p-6 bg-danger-50 rounded-lg flex justify-center items-center h-8 w-full cursor-pointer hover:bg-danger-150"
                >
                    <Trash2 size={16} />
                </div>
            </CardFooter>
        </Card>
        <Card>
            <CardBody className="h-full">
                <Tabs fullWidth size="sm">
                    <Tab key="controls"
                        title={<div className="flex items-center space-x-1">
                            <ListPlus size={16} />
                            <span>控件</span>
                        </div>}
                        className="xl:hidden block h-full"
                    >
                        <Scroll>
                            <Controls controls={controls} />
                        </Scroll>
                    </Tab>
                    <Tab key="form"
                        title={<div className="flex items-center space-x-1">
                            <Settings size={16} />
                            <span>表单设置</span>
                        </div>}
                        className="h-full">
                        <Scroll>
                            <FormSetting />
                        </Scroll>
                    </Tab>
                    <Tab key="property"
                        title={<div className="flex items-center space-x-1">
                            <Settings2 size={16} />
                            <span>字段设置</span>
                        </div>}
                        className="h-full"
                    >
                        <Scroll>
                            <FieldSetting />
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
                    Reset
                </Button>
                <Button className="w-auto" color="primary" size="sm" variant="shadow" radius="sm">
                    Submit
                </Button>
            </CardBody>
        </Card>
    </div>);
}