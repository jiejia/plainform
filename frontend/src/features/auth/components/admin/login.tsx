'use client'

import { Input, Button, Checkbox,Card, CardHeader, CardBody, CardFooter, Divider, PressEvent} from "@heroui/react";
import { Link } from "@heroui/link";
import { useFormStatus } from 'react-dom';
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import api from "@/features/core/library/api";



export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e: PressEvent) {
        console.log(email, password);
        api.post('api/admin/auth/login', {
            json: {
                email: email,
                password: password  
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }

    function SubmitButton() {
        const { pending } = useFormStatus();
        
        return (
            <Button
                type="button"
                color="primary"
                isLoading={pending}
                disabled={pending}
                className="w-full"
                onPress={handleSubmit}
            >
                {pending ? '登录中...' : '登录'}
            </Button>
        );
    }

    return (
        <Card className="w-full mt-5">
            <CardHeader className="text-center">
                <h2 className="text-center text-lg font-normal block w-full">Login</h2>
            </CardHeader>
            <Divider />
            <CardBody className="p-5">
                <div  className="w-full flex flex-col gap-5">
                    <Input
                        type="email"
                        name="email"
                        label=""
                        placeholder="邮箱"
                        labelPlacement="outside"
                        startContent={
                            <Mail size={16} className="content-center text-default-400" />
                        }
                        defaultValue={email}
                        onValueChange={(e) => setEmail(e)}
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
                        defaultValue={password}
                        onValueChange={(e) => setPassword(e)}
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
                </div>
            </CardBody>
        </Card>
    );
}
