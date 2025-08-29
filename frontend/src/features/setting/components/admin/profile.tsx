'use client'

import {Button, Switch, Input, Textarea, Card, CardBody, CardHeader, CardFooter, Divider, Avatar} from "@heroui/react";
import React from "react";
import {Select, SelectItem} from "@heroui/react";
import Menu from './menu';
import {SquarePen} from "lucide-react";
import FormModal from "@/features/core/components/admin/form-modal";
import { useAppContext } from "@/features/core/context/AppContext"; 

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
                                    <FormModal title="编辑邮箱" footer={null} button={
                                    <Button
                                        startContent={<SquarePen size={16}/>}
                                        size="sm"
                                        color="primary"
                                        variant="flat"
                                    >修改</Button>
                                    }>
                                        <Input type="email" placeholder="请输入邮箱" />
                                    </FormModal>
                                </div>
                            </li>
                            <li className="grid grid-flow-col justify-between items-center border-b-1 border-dotted border-default-200 pb-2">
                                <div>
                                    <h3 className="text-sm">密码</h3>
                                    <span className="text-default-400 text-xs">修改您的密码</span>
                                </div>
                                <div>
                                    <FormModal title="修改密码" footer={null} button={
                                        <Button
                                            startContent={<SquarePen size={16}/>}
                                            size="sm"
                                            color="primary"
                                            variant="flat"
                                        >修改</Button>
                                    }>
                                        <Input type="password" placeholder="请输入密码" />
                                    </FormModal>
                                </div>
                            </li>
                        </ul>

                    </CardBody>
                </Card>
            </div>
        </div>
    );
}