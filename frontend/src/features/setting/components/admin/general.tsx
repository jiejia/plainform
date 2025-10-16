'use client'

import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import React, { useEffect, useState } from "react";
import Menu from './menu';
import DefaultLanguage from '@/features/setting/components/admin/general/default-language';
import MaintanceMode from '@/features/setting/components/admin/general/maintance-mode';
import AppName from '@/features/setting/components/admin/general/app-name';
import AppDescription from '@/features/setting/components/admin/general/app-description';
import { Option } from '@/features/setting/types/general-option';
import { Language } from '@/features/setting/types/language';

export default function General({ initialOptions, languages }: { initialOptions: Option, languages: Language[] }) {

    const [options, setOptions] = useState<Option>(initialOptions);

    return (
        <div className="h-full grid grid-rows-[1fr] gap-4">
            <div className="h-full grid grid-cols-[75px_1fr] sm:grid-cols-[250px_1fr] gap-4">
                <Menu activeItem="general" />
                <Card className="">
                    <CardHeader>
                        <h2>General</h2>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <ul className="h-full grid gap-2 content-start">
                            <li className="grid grid-flow-col justify-between items-center border-b-1 border-dotted border-default-200 pb-2">
                                <div>
                                    <h3 className="text-sm">应用名称</h3>
                                    <span className="text-default-400 text-xs">设置应用名称</span>
                                </div>
                                <div>
                                    <AppName options={options} setOptions={setOptions} />
                                </div>
                            </li>
                            <li className="grid grid-flow-col justify-between items-center border-b-1 border-dotted border-default-200 pb-2">
                                <div>
                                    <h3 className="text-sm">应用描述</h3>
                                    <span className="text-default-400 text-xs">设置应用描述</span>
                                </div>
                                <div>
                                    <AppDescription options={options} setOptions={setOptions} />
                                </div>
                            </li>
                            <li className="grid grid-flow-col justify-between items-center border-b-1 border-dotted border-default-200 pb-2">
                                <div>
                                    <h3 className="text-sm">语言</h3>
                                    <span className="text-default-400 text-xs">设置站点语言</span>
                                </div>
                                <div>
                                    <DefaultLanguage options={options} setOptions={setOptions} languages={languages} />
                                </div>
                            </li>
                            <li className="grid grid-flow-col justify-between items-center border-b-1 border-dotted border-default-200 pb-2">
                                <label>
                                    <h3 className="text-sm">维护模式</h3>
                                    <span className="text-default-400 text-xs">是否开启站点维护模式</span>
                                </label>
                                <div>
                                    <MaintanceMode options={options} setOptions={setOptions} />
                                </div>
                            </li>
                        </ul>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}