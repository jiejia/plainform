'use client'

import {Button, Switch, Input, Textarea, Card, CardBody, CardHeader, CardFooter,Divider, Select, SelectItem} from "@heroui/react";
import React, {useState} from "react";
import Menu from './menu';
import {SquarePen, Sun, Moon, Monitor} from "lucide-react";

export default function Appearance() {
    const [selectedTheme, setSelectedTheme] = useState("system");

    const languages = [
        {key: "zh-CN", label: "简体中文"},
        {key: "en-US", label: "English"},
        {key: "ja-JP", label: "日本語"},
        {key: "ko-KR", label: "한국어"},
    ];

    const themes = [
        {
            key: "system",
            label: "系统",
            icon: <Monitor className="w-4 h-4" />
        },
        {
            key: "light", 
            label: "浅色",
            icon: <Sun className="w-4 h-4" />
        },
        {
            key: "dark", 
            label: "深色",
            icon: <Moon className="w-4 h-4" />
        },

        {
            key: "blue", 
            label: "蓝色",
            color: "#006FEE"
        },
        {
            key: "purple", 
            label: "紫色",
            color: "#7C3AED"
        },
        {
            key: "green", 
            label: "绿色",
            color: "#17C964"
        },
        {
            key: "yellow", 
            label: "黄色",
            color: "#F5A524"
        },
        {
            key: "red", 
            label: "红色",
            color: "#F31260"
        },
    ];

    return (
        <div className="h-full grid grid-rows-[1fr] gap-4">
            <div className="h-full grid grid-cols-[75px_1fr] sm:grid-cols-[250px_1fr] gap-4">
                <Menu activeItem="appearance" />
                <Card className="">
                    <CardHeader>
                        <h2>Appearance</h2>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <ul className="h-full grid gap-2 content-start">
                            <li className="grid grid-flow-col justify-between items-center border-b-1 border-dotted border-default-200 pb-2">
                                <div>
                                    <h3 className="text-sm">主题</h3>
                                    <span className="text-default-400 text-xs">设置站点主题</span>
                                </div>
                                <div>
                                    <Select
                                        placeholder="选择主题"
                                        selectedKeys={[selectedTheme]}
                                        onSelectionChange={(keys) => {
                                            const selected = Array.from(keys)[0] as string;
                                            setSelectedTheme(selected);
                                        }}
                                        className="w-48"
                                        size="sm"
                                        variant="bordered"
                                        renderValue={(items) => {
                                            return items.map((item) => {
                                                const theme = themes.find(t => t.key === item.key);
                                                if (!theme) return null;
                                                return (
                                                    <div key={item.key} className="flex items-center gap-2">
                                                        {theme.icon ? (
                                                            theme.icon
                                                        ) : (
                                                            <div 
                                                                className="w-4 h-4 rounded-full border border-default-300"
                                                                style={{ backgroundColor: theme.color }}
                                                            />
                                                        )}
                                                        <span>{theme.label}</span>
                                                    </div>
                                                );
                                            });
                                        }}
                                    >
                                        {themes.map((theme) => (
                                            <SelectItem
                                                key={theme.key}
                                                textValue={theme.label}
                                                startContent={
                                                    theme.icon ? (
                                                        theme.icon
                                                    ) : (
                                                        <div 
                                                            className="w-4 h-4 rounded-full border border-default-300"
                                                            style={{ backgroundColor: theme.color }}
                                                        />
                                                    )
                                                }
                                            >
                                                {theme.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </li>
                        </ul>

                    </CardBody>
                </Card>
            </div>
        </div>
    );
}