'use client'

import {Card, CardBody, CardHeader,Divider} from "@heroui/react";
import React, { useEffect, useState } from "react";
import Menu from './menu';
import { getOptions } from '@/features/setting/actions/setting-action';
import DefaultLanguage from '@/features/setting/components/admin/general/default-language';
import MaintanceMode from '@/features/setting/components/admin/general/maintance-mode';
import AppName from '@/features/setting/components/admin/general/app-name';
import AppDescription from '@/features/setting/components/admin/general/app-description';

interface Option {
    app_name: {
        value: string;
    };
    app_description: {
        value: string;
    };
    default_language: {
        value: string;
    };
    maintenance_mode: {
        value: boolean | string;
    };
}


export default function General() {
    
    const [options, setOptions] = useState<Option>({
        app_name: {
            value: '',
        },
        app_description: {
            value: '',
        },
        default_language: {
            value: 'zh-CN',
        },
        maintenance_mode: {
            value: false,
        },
    });

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchOptions = async () => {
            try {
                setLoading(true);
                const res: any = await getOptions('general');
                console.log("res.general", res.general);
                
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
                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <span>加载中...</span>
                        </div>
                    ) : (   
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
                                    <DefaultLanguage options={options} setOptions={setOptions} />
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

                    )}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}