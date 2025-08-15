'use client'

import Scroll from "@/features/core/components/shared/scroll";
import React from "react";
import {Button, Tabs, Tab, Card, CardHeader, CardBody, CardFooter, Divider} from "@heroui/react";
import {ListPlus, StickyNote, Settings, Settings2, Type, Text} from "lucide-react"


export default function Save() {
    return (
        <div
            className="grid  gap-4 grid-cols-[1fr] sm:grid-cols-[1fr_300px] xl:grid-cols-[300px_1fr_300px] grid-rows-[1fr_1fr_56px] sm:grid-rows-[1fr_56px] h-full">
            <Card className="xl:block hidden">
                <CardHeader>
                    <h2 className="flex items-center space-x-2">
                        <ListPlus size={16}/>
                        <span>Controls</span>
                    </h2>
                </CardHeader>
                <Divider/>
                    <CardBody className="h-full">
                    <Scroll>
                        <></>
                    </Scroll>
                </CardBody>
            </Card>
            <Card className="">
                <CardHeader>
                    <h2 className="flex items-center space-x-2">
                        <StickyNote size={16}/>
                        <span>Preview</span>
                    </h2>
                </CardHeader>
                <Divider/>
                <CardBody className="h-full">
                    <Scroll>
                        <></>
                    </Scroll>
                </CardBody>
            </Card>
            <Card>
                <CardBody className="h-full">
                    <Tabs fullWidth variant="solid" color="default" size="sm">
                        <Tab key="controls1"
                             title={
                                 <div className="flex items-center space-x-2">
                                     <Settings size={16}/>
                                     <span>表单属性</span>
                                 </div>
                             }
                             className="h-full">
                            <Scroll>
                                <></>
                            </Scroll>
                        </Tab>
                        <Tab key="controls2"
                             title={
                                 <div className="flex items-center space-x-2">
                                     <Settings2 size={16}/>
                                     <span>控件属性</span>
                                 </div>
                             }
                             className="h-full"
                             >
                            <Scroll>
                                <></>
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
        </div>
    );
}