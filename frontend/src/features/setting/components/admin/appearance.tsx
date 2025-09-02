'use client'

import {Button, Switch, Input, Textarea, Card, CardBody, CardHeader, CardFooter,Divider, Select, SelectItem, Skeleton} from "@heroui/react";
import React, {useEffect, useState} from "react";
import Menu from './menu';
import { getOptions } from "../../actions/setting-action";
import Theme from "./appearance/theme";

interface Option {
    theme: {
        value: string;
    };
}

export default function Appearance() {
    const [options, setOptions] = useState<Option>({
        theme: {
            value: 'light'
        }
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                setLoading(true);
                const res: any = await getOptions('appearances');
                setOptions(res.appearances as Option);
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
                <Menu activeItem="appearance" />
                <Card className="">
                    <CardHeader>
                        <h2>Appearance</h2>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        {loading ? <Skeleton className="h-10 w-full" /> : (
                        <ul className="h-full grid gap-2 content-start">
                            <li className="grid grid-flow-col justify-between items-center border-b-1 border-dotted border-default-200 pb-2">
                                <div>
                                    <h3 className="text-sm">主题</h3>
                                    <span className="text-default-400 text-xs">设置站点主题</span>
                                </div>
                                <div>
                                    <Theme options={options} setOptions={setOptions} />
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