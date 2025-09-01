'use client'

import {Card, CardBody, CardHeader, Divider, Avatar} from "@heroui/react";
import React from "react";
import Menu from './menu';
import { useAppContext } from "@/features/core/context/AppContext"; 
import ResetPassword from './profile/reset-password';
import UpdateEmail from './profile/update-email';

export default function General() {
    const { admin } = useAppContext();
    const languages = [
        {key: "zh-CN", label: "简体中文"},
        {key: "en-US", label: "English"},
        {key: "ja-JP", label: "日本語"},
        {key: "ko-KR", label: "한국어"},
    ];

    return (
        <div className="h-full grid grid-rows-[1fr] gap-4">
            <div className="h-full grid grid-cols-[75px_1fr] sm:grid-cols-[250px_1fr] gap-4">
                <Menu activeItem="profile" />
                <Card className="">
                    <CardHeader>
                        <h2>General</h2>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <ul className="h-full grid gap-2 content-start">
                            <li className="grid grid-flow-col justify-between items-center border-b-1 border-dotted border-default-200 pb-2">
                                <div>
                                    <h3 className="text-sm">头像</h3>
                                    <span className="text-default-400 text-xs">设置您的头像</span>
                                </div>
                                <div className="pr-4">
                                    <Avatar
                                        as="button"
                                        className="transition-transform"
                                        src={admin.avatar || ''}
                                        name={admin.avatar ? undefined : admin.username?.charAt(0).toUpperCase()}
                                        size="md"
                                        isBordered
                                        title={admin.username}
                                    />
                                </div>
                            </li>
                            <li className="grid grid-flow-col justify-between items-center border-b-1 border-dotted border-default-200 pb-2">
                                <div>
                                    <h3 className="text-sm">邮箱</h3>
                                    <span className="text-default-400 text-xs">设置您的邮箱</span>
                                </div>
                                <div>
                                    <UpdateEmail />
                                </div>
                            </li>
                            <li className="grid grid-flow-col justify-between items-center border-b-1 border-dotted border-default-200 pb-2">
                                <div>
                                    <h3 className="text-sm">密码</h3>
                                    <span className="text-default-400 text-xs">修改您的密码</span>
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