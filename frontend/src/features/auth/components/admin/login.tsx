'use client'

import { Input, Button, Checkbox,Card, CardHeader, CardBody, CardFooter, Divider, PressEvent, addToast, cn} from "@heroui/react";
import { Link } from "@heroui/link";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { msg } from "@/features/core/utils/ui";
import { login } from "@/features/auth/actions/auth-action";
import { loginValidator } from "@/features/auth/validators/login-validator";

export default function Login() {

    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e: PressEvent) {
        setIsPending(true);

        // validate form data
        const result = loginValidator({email, password});
        if (!result.success) {
            // get first error message
            msg('login failed', result.error.issues[0].message, 'warning');
            setIsPending(false);
            return;
        }

        // login
        const res = await login(email, password);
        if (res === true) {
            router.push('/dashboard');
        } else {
            msg('login failed', res, 'warning');
        }

        setIsPending(false);
    }

    function SubmitButton() {
        return (
            <Button
                type="button"
                color="primary"
                isLoading={isPending}
                disabled={isPending}
                className="w-full"
                onPress={handleSubmit}
            >
                {isPending ? '登录中...' : '登录'}
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
                <form  className="w-full flex flex-col gap-5" noValidate>
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
                        validationBehavior="aria"
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
                        validationBehavior="aria"
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
            </CardBody>
        </Card>
    );
}
