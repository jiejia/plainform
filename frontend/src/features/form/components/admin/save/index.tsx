'use client'

import Scroll from "@/features/core/components/shared/scroll";
import React from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, Divider, Tab, Tabs, Input, Textarea, Select, SelectItem,Switch, cn, Slider} from "@heroui/react";
import OptionsControl from "./options-control";
import {
    Calendar,
    CheckSquare,
    ChevronDown,
    Circle,
    Clock,
    Hash,
    ListPlus,
    Mail,
    Phone,
    Settings,
    Settings2,
    Star,
    StickyNote,
    Text,
    Trash2,
    Type,
    Upload
} from "lucide-react"


export default function Save() {
    return (<div
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
                    <ul className="grid grid-cols-1 gap-2 h-full">
                        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                            <Type size={18} className="text-blue-500"/>
                            <span className="text-sm font-medium">单行文本</span>
                        </li>
                        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                            <Text size={18} className="text-green-500"/>
                            <span className="text-sm font-medium">多行文本</span>
                        </li>
                        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                            <Hash size={18} className="text-purple-500"/>
                            <span className="text-sm font-medium">数字</span>
                        </li>
                        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                            <Mail size={18} className="text-red-500"/>
                            <span className="text-sm font-medium">邮箱</span>
                        </li>
                        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                            <Phone size={18} className="text-orange-500"/>
                            <span className="text-sm font-medium">电话</span>
                        </li>
                        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                            <Calendar size={18} className="text-cyan-500"/>
                            <span className="text-sm font-medium">日期</span>
                        </li>
                        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                            <Clock size={18} className="text-indigo-500"/>
                            <span className="text-sm font-medium">时间</span>
                        </li>
                        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                            <ChevronDown size={18} className="text-teal-500"/>
                            <span className="text-sm font-medium">下拉选择</span>
                        </li>
                        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                            <CheckSquare size={18} className="text-pink-500"/>
                            <span className="text-sm font-medium">多选框</span>
                        </li>
                        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                            <Circle size={18} className="text-yellow-500"/>
                            <span className="text-sm font-medium">单选框</span>
                        </li>
                        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                            <Upload size={18} className="text-gray-500"/>
                            <span className="text-sm font-medium">文件上传</span>
                        </li>
                        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                            <Star size={18} className="text-amber-500"/>
                            <span className="text-sm font-medium">评分</span>
                        </li>
                        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                            <Star size={18} className="text-amber-500"/>
                            <span className="text-sm font-medium">评分</span>
                        </li>
                    </ul>
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
                    <ul className="grid grid-cols-1 gap-2 h-full">
                        <li className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                            <span className="text-sm font-medium text-gray-700">1.请输入标题</span>
                            <span className="text-xs text-gray-500 px-2 py-1 rounded-full">text</span>
                        </li>
                        <li className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                            <span className="text-sm font-medium text-gray-700">2.请输入标题</span>
                            <span className="text-xs text-gray-500 px-2 py-1 rounded-full">radio</span>
                        </li>
                        <li className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                            <span className="text-sm font-medium text-gray-700">3.请输入标题</span>
                            <span className="text-xs text-gray-500 px-2 py-1 rounded-full">textarea</span>
                        </li>
                        <li className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                            <span className="text-sm font-medium text-gray-700">4.请输入标题</span>
                            <span className="text-xs text-gray-500 px-2 py-1 rounded-full">textarea</span>
                        </li>
                        <li className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                            <span className="text-sm font-medium text-gray-700">5.请输入标题</span>
                            <span className="text-xs text-gray-500 px-2 py-1 rounded-full">radio</span>
                        </li>
                        <li className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                            <span className="text-sm font-medium text-gray-700">6.请输入标题</span>
                            <span className="text-xs text-gray-500 px-2 py-1 rounded-full">date</span>
                        </li>
                        <li className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                            <span className="text-sm font-medium text-gray-700">7.请输入标题</span>
                            <span className="text-xs text-gray-500 px-2 py-1 rounded-full">date</span>
                        </li>
                        <li className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                            <span className="text-sm font-medium text-gray-700">8.请输入标题</span>
                            <span className="text-xs text-gray-500 px-2 py-1 rounded-full">radio</span>
                        </li>
                        <li className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                            <span className="text-sm font-medium text-gray-700">9.请输入标题</span>
                            <span className="text-xs text-gray-500 px-2 py-1 rounded-full">date</span>
                        </li>
                        <li className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                            <span className="text-sm font-medium text-gray-700">10.请输入标题</span>
                            <span className="text-xs text-gray-500 px-2 py-1 rounded-full">textarea</span>
                        </li>
                        <li className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                            <span className="text-sm font-medium text-gray-700">11.请输入标题</span>
                            <span className="text-xs text-gray-500 px-2 py-1 rounded-full">date</span>
                        </li>
                        <li className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                            <span className="text-sm font-medium text-gray-700">12.请输入标题</span>
                            <span className="text-xs text-gray-500 px-2 py-1 rounded-full">radio</span>
                        </li>
                        <li className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                            <span className="text-sm font-medium text-gray-700">13.请输入标题</span>
                            <span className="text-xs text-gray-500 px-2 py-1 rounded-full">date</span>
                        </li>
                        <li className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                            <span className="text-sm font-medium text-gray-700">14.请输入标题</span>
                            <span className="text-xs text-gray-500 px-2 py-1 rounded-full">textarea</span>
                        </li>
                    </ul>
                </Scroll>
            </CardBody>
            <CardFooter>
                <div
                    id="recycle"
                    className="p-6 bg-danger-50 rounded-lg flex justify-center items-center h-8 w-full cursor-pointer hover:bg-danger-150"
                >
                    <Trash2 size={16}/>
                </div>
            </CardFooter>
        </Card>
        <Card>
            <CardBody className="h-full">
                <Tabs fullWidth variant="solid" color="default" size="sm">
                    <Tab key="controls"
                         title={<div className="flex items-center space-x-1">
                             <ListPlus size={16}/>
                             <span>控件</span>
                         </div>}
                         className="xl:hidden block h-full"
                    >
                        <Scroll>
                            <ul className="grid grid-cols-1 gap-2 h-full">
                                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                                    <Type size={18} className="text-blue-500"/>
                                    <span className="text-sm font-medium">单行文本</span>
                                </li>
                                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                                    <Text size={18} className="text-green-500"/>
                                    <span className="text-sm font-medium">多行文本</span>
                                </li>
                                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                                    <Hash size={18} className="text-purple-500"/>
                                    <span className="text-sm font-medium">数字</span>
                                </li>
                                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                                    <Mail size={18} className="text-red-500"/>
                                    <span className="text-sm font-medium">邮箱</span>
                                </li>
                                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                                    <Phone size={18} className="text-orange-500"/>
                                    <span className="text-sm font-medium">电话</span>
                                </li>
                                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                                    <Calendar size={18} className="text-cyan-500"/>
                                    <span className="text-sm font-medium">日期</span>
                                </li>
                                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                                    <Clock size={18} className="text-indigo-500"/>
                                    <span className="text-sm font-medium">时间</span>
                                </li>
                                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                                    <ChevronDown size={18} className="text-teal-500"/>
                                    <span className="text-sm font-medium">下拉选择</span>
                                </li>
                                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                                    <CheckSquare size={18} className="text-pink-500"/>
                                    <span className="text-sm font-medium">多选框</span>
                                </li>
                                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                                    <Circle size={18} className="text-yellow-500"/>
                                    <span className="text-sm font-medium">单选框</span>
                                </li>
                                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                                    <Upload size={18} className="text-gray-500"/>
                                    <span className="text-sm font-medium">文件上传</span>
                                </li>
                                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                                    <Star size={18} className="text-amber-500"/>
                                    <span className="text-sm font-medium">评分</span>
                                </li>
                                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
                                    <Star size={18} className="text-amber-500"/>
                                    <span className="text-sm font-medium">评分</span>
                                </li>
                            </ul>
                        </Scroll>
                    </Tab>
                    <Tab key="form"
                         title={<div className="flex items-center space-x-1">
                             <Settings size={16}/>
                             <span>表单属性</span>
                         </div>}
                         className="h-full">
                        <Scroll>
                            <div className="h-full grid grid-cols-1 gap-4 content-start">
                                <Input label="Title" placeholder="Enter form title" type="text" isRequired size="sm"/>
                                <Textarea label="Description" placeholder="Enter form description" />
                                <Select
                                    label="Sequential numbering style"
                                    placeholder=""
                                    className="max-w-full"
                                    selectedKeys={[0]}
                                >
                                    <SelectItem key={0}>
                                        None
                                    </SelectItem>
                                    <SelectItem key={1}>
                                        Arabic numerals
                                    </SelectItem>
                                </Select>
                                <Switch
                                    classNames={{
                                        base: cn(
                                            "inline-flex flex-row-reverse w-full max-w-full bg-content2 hover:bg-content2 items-center",
                                            "justify-between cursor-pointer rounded-lg gap-2 px-1 py-4 border-2 border-transparent"
                                        ),
                                        wrapper: "p-0 h-4 overflow-visible",
                                        thumb: cn(
                                            "w-6 h-6 border-2 shadow-lg",
                                            "group-data-[hover=true]:border-primary",
                                            //selected
                                            "group-data-[selected=true]:ml-6",
                                            // pressed
                                            "group-data-[pressed=true]:w-7",
                                            "group-data-[selected]:group-data-[pressed]:ml-4"
                                        )
                                    }}
                                    size="md"
                                >
                                    <div className="flex flex-col gap-1">
                                        <p className="text-tiny text-default-600">Required</p>
                                    </div>
                                </Switch>
                            </div>
                        </Scroll>
                    </Tab>
                    <Tab key="property"
                         title={<div className="flex items-center space-x-1">
                             <Settings2 size={16}/>
                             <span>控件属性</span>
                         </div>}
                         className="h-full"
                    >
                        <Scroll>
                            <div className="h-full grid grid-cols-1 gap-4 content-start">
                                <Input label="Title" placeholder="enter title" type="text" isRequired size="sm"/>
                                <Input label="Description" placeholder="enter description" type="text" size="sm"/>
                                <Input label="Regrex" placeholder="enter regrex" type="text" size="sm"/>
                                <Select
                                    label="Date Format"
                                    placeholder=""
                                    className="max-w-full"
                                    selectedKeys={[0]}
                                >
                                    <SelectItem key={0}>
                                        None
                                    </SelectItem>
                                    <SelectItem key={1}>
                                        Arabic numerals
                                    </SelectItem>
                                </Select>
                                <Switch
                                    classNames={{
                                        base: cn(
                                            "inline-flex flex-row-reverse w-full max-w-full bg-content2 hover:bg-content2 items-center",
                                            "justify-between cursor-pointer rounded-lg gap-2 px-1 py-4 border-2 border-transparent"
                                        ),
                                        wrapper: "p-0 h-4 overflow-visible",
                                        thumb: cn(
                                            "w-6 h-6 border-2 shadow-lg",
                                            "group-data-[hover=true]:border-primary",
                                            //selected
                                            "group-data-[selected=true]:ml-6",
                                            // pressed
                                            "group-data-[pressed=true]:w-7",
                                            "group-data-[selected]:group-data-[pressed]:ml-4"
                                        )
                                    }}
                                    size="md"
                                >
                                    <div className="flex flex-col gap-1">
                                        <p className="text-tiny text-default-600">Required</p>
                                    </div>
                                </Switch>
                                <Slider
                                    defaultValue={1}
                                    label="Length"
                                    maxValue={255}
                                    minValue={1}
                                    step={1}
                                    size="md"
                                    classNames={{
                                        base: "w-full px-1", // 确保基础容器有足够宽度，添加一点内边距
                                        track: "w-full", // 确保轨道占满宽度
                                        filler: "w-full", // 确保填充器占满宽度
                                        labelWrapper: "w-full" // 确保标签容器占满宽度
                                    }}
                                />
                                <Slider
                                    classNames={{
                                        base: "w-full px-1", // 确保基础容器有足够宽度，添加一点内边距
                                        track: "w-full", // 确保轨道占满宽度
                                        filler: "w-full", // 确保填充器占满宽度
                                        labelWrapper: "w-full" // 确保标签容器占满宽度
                                    }}
                                    label="Length Range"
                                    maxValue={255}
                                    minValue={1}
                                    step={10}
                                    value={10}
                                />
                                <OptionsControl
                                    label="Options"
                                    className="w-full"
                                />
                            </div>
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