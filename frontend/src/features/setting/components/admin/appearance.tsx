'use client'

import {Card, CardBody, CardHeader, Divider, } from "@heroui/react";
import React, { useState } from "react";
import Menu from './menu';
import Theme from "./appearance/theme";
import { Option } from '@/features/setting/types/appearance-option';
import { useTranslations } from 'next-intl';

export default function Appearance({ initialOptions }: { initialOptions: Option }) {
    const t = useTranslations('setting');
    const [options, setOptions] = useState<Option>(initialOptions);

    return (
        <div className="h-full grid grid-rows-[1fr] gap-4">
            <div className="h-full grid grid-cols-[75px_1fr] sm:grid-cols-[250px_1fr] gap-4">
                <Menu activeItem="appearance" />
                <Card className="">
                    <CardHeader>
                        <h2>{t('appearance')}</h2>
                    </CardHeader>
                    <Divider />
                    <CardBody>

                        <ul className="h-full grid gap-2 content-start">
                            <li className="grid grid-flow-col justify-between items-center border-b-1 border-dotted border-default-200 pb-2">
                                <div>
                                    <h3 className="text-sm">{t('default_theme')}</h3>
                                    <span className="text-default-400 text-xs">{t('default_theme_description')}</span>
                                </div>
                                <div>
                                    <Theme options={options} setOptions={setOptions} />
                                </div>
                            </li>
                        </ul>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}