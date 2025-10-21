'use client'

import {Card, CardBody, CardHeader, Divider} from "@heroui/react";
import React from "react";
import Menu from './menu';
import { useAppContext } from "@/features/core/context/AppContext"; 
import ResetPassword from './profile/reset-password';
import EditEmail from './profile/edit-email';
import EditAvatar from './profile/edit-avatar';
import { useTranslations } from 'next-intl';

export default function General() {
    const { admin } = useAppContext();
    const t = useTranslations('setting');
    return (
        <div className="h-full grid grid-rows-[1fr] gap-4">
            <div className="h-full grid grid-cols-[75px_1fr] sm:grid-cols-[250px_1fr] gap-4">
                <Menu activeItem="profile" />
                <Card className="">
                    <CardHeader>
                        <h2>{t('profile')}</h2>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <ul className="h-full grid gap-2 content-start">
                            <li className="grid grid-flow-col justify-between items-center border-b-1 border-dotted border-default-200 pb-2">
                                <div>
                                    <h3 className="text-sm">{t('avatar')}</h3>
                                    <span className="text-default-400 text-xs">{t('avatar_description')}</span>
                                </div>
                                <div className="pr-4">
                                    <EditAvatar admin={admin} />
                                </div>
                            </li>
                            <li className="grid grid-flow-col justify-between items-center border-b-1 border-dotted border-default-200 pb-2">
                                <div>
                                    <h3 className="text-sm">{t('email')}</h3>
                                    <span className="text-default-400 text-xs">{admin.email}</span>
                                </div>
                                <div>
                                    <EditEmail />
                                </div>
                            </li>
                            <li className="grid grid-flow-col justify-between items-center border-b-1 border-dotted border-default-200 pb-2">
                                <div>
                                    <h3 className="text-sm">{t('password')}</h3>
                                    <span className="text-default-400 text-xs">{t('password_description')}</span>
                                </div>
                                <div>
                                    <ResetPassword />
                                </div>
                            </li>
                        </ul>

                    </CardBody>
                </Card>
            </div>
        </div>
    );
}