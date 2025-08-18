'use client'

import Block from '@/features/core/components/shared/block';
import {Button, Switch, Input, Textarea, Card, CardBody, CardHeader, CardFooter,Divider} from "@heroui/react";
import React from "react";
import {Select, SelectItem} from "@heroui/react";
import Menu from './menu';
import {SquarePen} from "lucide-react";

export default function General() {

    const languages = [
        {key: "zh-CN", label: "简体中文"},
        {key: "en-US", label: "English"},
        {key: "ja-JP", label: "日本語"},
        {key: "ko-KR", label: "한국어"},
    ];

    return (
        <div className="h-full grid grid-rows-[1fr] gap-4">
            <div className="h-full grid grid-cols-[75px_1fr] sm:grid-cols-[250px_1fr] gap-4">
                <Menu activeItem="general" />
                <Card className="">
                    <CardHeader>
                        <h2>General</h2>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <ul className="h-full grid gap-2 content-start">
                            <li className="grid grid-flow-col justify-between items-center border-b-1 border-dotted border-default-200 pb-2">
                                <div>
                                    <h3 className="text-sm">站点名称</h3>
                                    <span className="text-default-400 text-xs">设置站点名称</span>
                                </div>
                                <div>
                                    <Button
                                        startContent={<SquarePen size={16}/>}
                                        size="sm"
                                        color="default"
                                        variant="flat"
                                    >编辑</Button>
                                </div>
                            </li>
                            <li className="grid grid-flow-col justify-between items-center border-b-1 border-dotted border-default-200 pb-2">
                                <div>
                                    <h3 className="text-sm">站点描述</h3>
                                    <span className="text-default-400 text-xs">设置站点描述</span>
                                </div>
                                <div>
                                    <Button
                                        startContent={<SquarePen size={16}/>}
                                        size="sm"
                                        color="default"
                                        variant="flat"
                                    >编辑</Button>
                                </div>
                            </li>
                            <li className="grid grid-flow-col justify-between items-center border-b-1 border-dotted border-default-200 pb-2">
                                <div>
                                    <h3 className="text-sm">语言</h3>
                                    <span className="text-default-400 text-xs">设置站点语言</span>
                                </div>
                                <div>
                                    <Select
                                        className="w-40"
                                        placeholder="请选择语言"
                                        id="language"
                                        name="language"
                                        size="sm"
                                        defaultSelectedKeys={["zh-CN"]}
                                    >
                                        {languages.map((language) => (
                                            <SelectItem key={language.key}>
                                                {language.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </li>
                            <li className="grid grid-flow-col justify-between items-center border-b-1 border-dotted border-default-200 pb-2">
                                <label for="maintance">
                                    <h3 className="text-sm">维护模式</h3>
                                    <span className="text-default-400 text-xs">是否开启站点维护模式</span>
                                </label>
                                <div>
                                    <Switch defaultSelected aria-label="Automatic updates" size="sm" id="maintance"/>
                                </div>
                            </li>
                        </ul>

                    </CardBody>
                </Card>
            </div>
        </div>
    );
}