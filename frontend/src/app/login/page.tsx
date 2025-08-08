'use client'

import Block from '@/features/core/components/shared/block';
import { Input, Button, Checkbox } from "@heroui/react";
import { Link } from "@heroui/link";
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { Mail, Lock } from "lucide-react";

function SubmitButton() {
    const { pending } = useFormStatus();
    
    return (
        <Button
            type="submit"
            color="primary"
            isLoading={pending}
            disabled={pending}
            className="w-full"https://tailwindcss.com/docs/
        >
            {pending ? '登录中...' : '登录'}
        </Button>
    );
}

export default function Login() {

    return (
        <Block className="w-full mt-5 px-5 py-5">
            <h2 className="text-center text-md font-normal">Login</h2>

            {/*<div className="h-10 flex items-center justify-center mb-2">*/}

            {/*</div>*/}
            <form  className="w-full flex flex-col gap-5 mt-5">
                <Input
                    type="email"
                    name="email"
                    label=""
                    placeholder="邮箱"
                    labelPlacement="outside"
                    startContent={
                        <Mail size={16} className="content-center text-default-400" />
                    }
                />
                <Input
                    type="password"
                    name="password"
                    label=""
                    placeholder="密码"
                    labelPlacement="outside"
                    startContent={
                        <Lock size={16} className="content-center text-default-400" />
                    }
                />
                <div className="text-xs grid grid-flow-col">
                    <Checkbox defaultSelected size="sm">
                        <span className="text-xs">记住我</span>
                    </Checkbox>
                    <Link href="/forget-password" className="content-center justify-self-end text-xs">
                        忘记密码？
                    </Link>
                </div>
                <SubmitButton />
            </form>
        </Block>
    );
}
