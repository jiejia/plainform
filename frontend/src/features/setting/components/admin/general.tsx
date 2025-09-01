'use client'

import {Button, Switch, Input, Card, CardBody, CardHeader,Divider} from "@heroui/react";
import React, { useEffect, useState } from "react";
import {Select, SelectItem} from "@heroui/react";
import Menu from './menu';
import {SquarePen} from "lucide-react";
import FormModal from '@/features/core/components/admin/form-modal';
import { getOptions } from '@/features/setting/actions/setting-action';

interface Option {
    app_name: {
        value: string;
    };
    app_description: {
        value: string;
    };
    language: {
        value: string;
    };
    maintance: {
        value: boolean;
    };
}


export default function General() {

    const languages = [
        {key: "zh-CN", label: "简体中文"},
        {key: "en-US", label: "English"},
        {key: "ja-JP", label: "日本語"},
        {key: "ko-KR", label: "한국어"},
    ];

    const [options, setOptions] = useState<Option>({
        app_name: {
            value: '',
        },
        app_description: {
            value: '',
        },
        language: {
            value: 'zh-CN',
        },
        maintance: {
            value: false,
        },
    });

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchOptions = async () => {
            try {
                setLoading(true);
                const res: any = await getOptions('general');
                console.log("res", res);
                
                // 检查返回数据是否有效
                if (res && res.general) {
                    setOptions(res.general as Option);
                } else {
                    console.warn('No general options found in response:', res);
                }
            } catch (error) {
                console.error('Failed to fetch options:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, []);

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
                                    <h3 className="text-sm">应用名称</h3>
                                    <span className="text-default-400 text-xs">设置应用名称</span>
                                </div>
                                <div>
                                    <FormModal title="编辑应用名称" footer={null} button={
                                    <Button
                                        startContent={<SquarePen size={16}/>}
                                        size="sm"
                                        color="default"
                                        variant="flat"
                                    >编辑</Button>
                                    }>
                                        <Input type="text" placeholder="请输入应用名称" value={options.app_name.value} />
                                    </FormModal>
                                </div>
                            </li>
                            <li className="grid grid-flow-col justify-between items-center border-b-1 border-dotted border-default-200 pb-2">
                                <div>
                                    <h3 className="text-sm">应用描述</h3>
                                    <span className="text-default-400 text-xs">设置应用描述</span>
                                </div>
                                <div>
                                    <FormModal title="编辑应用描述" footer={null} button={
                                    <Button
                                        startContent={<SquarePen size={16}/>}
                                        size="sm"
                                        color="default" variant="flat"
                                    >编辑</Button>
                                    }>
                                        <Input type="text" placeholder="请输入应用描述" />
                                    </FormModal>
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
                                <label>
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