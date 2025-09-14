'use client'

import { Input, Button, Card, CardHeader, CardBody, Divider, PressEvent } from "@heroui/react";
import { Mail } from "lucide-react";
import { Link } from "@heroui/link";
import { useState, useEffect } from "react";
import { forgetPasswordValidator } from "@/features/auth/validators/forget-password-validator";
import { msg } from "@/features/core/utils/ui";
import { forgetPassword } from "@/features/auth/actions/auth-action";

type forgetPasswordError = {
    email: string;
}

export default function ForgetPassword() {

    const [email, setEmail] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [errors, setErrors] = useState<forgetPasswordError>({
        email: ''
    });

    // Countdown effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (countdown > 0) {
            interval = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [countdown]);

    async function handleSubmit(e?: PressEvent | React.FormEvent) {
        // 阻止表单默认提交行为
        if (e && 'preventDefault' in e) {
            e.preventDefault();
        }

        setIsPending(true);

        // validate form data
        const result = forgetPasswordValidator({ email });
        if (!result.success) {
            const { fieldErrors } = result.error.flatten();
            setErrors({
                email: fieldErrors.email?.[0] ?? '',
            });

            setIsPending(false);
            return;
        }

        // forget password
        const res = await forgetPassword(email);
        if (res === true) {
            msg('send success', 'Please check your email', 'success');
            setCountdown(60); // Start 60 seconds countdown
        } else {
            msg('send failed', res, 'warning');
        }

        setIsPending(false);
    }

    return (
        <Card className="w-full mt-5">
            <CardHeader className="text-center">
                <h2 className="text-center text-lg font-normal block w-full">Forget Password</h2>
            </CardHeader>
            <Divider />
            <CardBody className="p-5">
                <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div>
                        <p className="text-xs text-center text-slate-400"> You will receive a link to create a new password via email.</p>
                    </div>
                    <Input
                        type="email"
                        label=""
                        placeholder="Email"
                        labelPlacement="outside"
                        startContent={
                            <span className="shrink-0">
                                <Mail size={16} className="content-center text-default-400" aria-label="Email" />
                            </span>
                        }
                        value={email}
                        onValueChange={(e) => setEmail(e)}
                        validationBehavior="aria"
                        onFocus={() => setErrors({ ...errors, email: '' })}
                        endContent={
                            errors.email
                                ? (
                                    <span className="text-danger-500 text-xs bg-white px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                                        {errors.email}
                                    </span>
                                )
                                : null
                        }
                    />
                    <p className="text-center text-xs"><span>Remember Password?</span> <Link href="/login" className="content-center justify-self-end text-xs">Login</Link></p>
                    <Button
                        type="submit"
                        color="primary"
                        isLoading={isPending}
                        isDisabled={countdown > 0}
                        onPress={handleSubmit}
                    >
                        {isPending ? 'Sending...' : countdown > 0 ? `Resend (${countdown}s)` : 'Send'}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}
