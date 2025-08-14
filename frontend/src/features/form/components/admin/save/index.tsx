'use client'

import Block from "@/features/core/components/shared/block";
import Scroll from "@/features/core/components/shared/scroll";
import React from "react";
import {Button, Tabs, Tab, Card, CardHeader, CardBody, CardFooter} from "@heroui/react";
import {ListPlus, StickyNote, Settings, Settings2, Type, Text} from "lucide-react"


export default function Save() {
    return (
        <div
            className="grid  gap-4 grid-cols-[1fr] sm:grid-cols-[1fr_300px] xl:grid-cols-[300px_1fr_300px] grid-rows-[1fr_1fr_56px] sm:grid-rows-[1fr_56px] h-full">
            <Block className="xl:grid hidden xl:grid-rows-[auto_1fr]">
                <h2 className="flex items-center space-x-2 border-b-1 border-b-default-300 border-dotted pb-2">
                    <ListPlus size={16}/>
                    <span>Controls</span>
                </h2>
            </Block>
            <Block className="">
                <h2 className="flex items-center space-x-2 border-b-1 border-b-default-300 border-dotted pb-2">
                    <StickyNote size={16}/>
                    <span>Preview</span>
                </h2>
            </Block>
            <Block className="grid grid-rows-[40px_1fr]">
                <Tabs fullWidth variant="solid" color="default" size="sm">
                    <Tab key="controls1"
                         title={
                             <div className="flex items-center space-x-2">
                                 <Settings size={16}/>
                                 <span>表单属性</span>
                             </div>
                         }/>
                    <Tab key="controls2"
                         title={
                             <div className="flex items-center space-x-2">
                                 <Settings2 size={16}/>
                                 <span>控件属性</span>
                             </div>
                         }/>
                </Tabs>
            </Block>
            <Block
                className={"col-span-1 sm:col-span-2 xl:col-span-3 flex justify-center gap-2  pt-3"}
            >
                <Button color="primary" radius="sm" size="sm" variant="flat">
                    Reset
                </Button>
                <Button color="primary" size="sm" variant="shadow" radius="sm">
                    Submit
                </Button>
            </Block>
        </div>
    );
}