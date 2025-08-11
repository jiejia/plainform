'use client'

import LoginLayout from '@/app/login/layout';
import Block from '@/features/core/components/shared/block';
import {Input, Button} from "@heroui/react";
import {Link} from "@heroui/link";
import { Mail } from "lucide-react";

export default function ForgetPassword() {
    return (
        <LoginLayout>
                <Block className="w-full mt-5 px-5 py-5">
                    <h2 className="text-center text-lg font-normal">Forget Password</h2>
                    <div className="w-full flex flex-col gap-5 mt-5">
                        <div>
                            <p className="text-xs text-center text-slate-400"> You will receive a link to create a new
                                password via email.</p>
                        </div>
                        <Input
                            type="email"
                            label=""
                            placeholder="Email"
                            labelPlacement="outside"
                            startContent={
                                <Mail size={16} className="content-center text-default-400" aria-label="Email" />
                            }
                        />
                        <p className="text-center text-xs"><span>Remember Password?</span> <Link href="/login" className="content-center justify-self-end text-xs">Login</Link></p>
                        <Button color="primary">
                            Send
                        </Button>

                    </div>
                </Block>
        </LoginLayout>
    );
}
