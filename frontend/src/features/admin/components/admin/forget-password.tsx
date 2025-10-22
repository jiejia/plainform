'use client'

import { Input, Button, Card, CardHeader, CardBody, Divider, PressEvent } from "@heroui/react";
import { Mail } from "lucide-react";
import { Link } from "@heroui/link";
import { useState, useEffect } from "react";
import { forgetPasswordValidator } from "@/features/admin/validators/forget-password-validator";
import { msg } from "@/features/core/utils/ui";
import { forgetPassword } from "@/features/admin/actions/auth-action";
import { useTranslations } from 'next-intl';


type forgetPasswordError = {
    email: string;
}

export default function ForgetPassword() {
    const t = useTranslations();

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
        if (res.code === 0) {
            msg(t('admin.forget_password_sent_success'), t('admin.forget_password_sent_success'), 'success');
            setCountdown(60); // Start 60 seconds countdown
        } else {
            msg(t('admin.forget_password_sent_failed'), t(res.msg), 'warning');
        }

        setIsPending(false);
    }

    return (
        <Card className="w-full mt-5">
            <CardHeader className="text-center">
                <h2 className="text-center text-lg font-normal block w-full">{t('admin.forget_password')}</h2>
            </CardHeader>
            <Divider />
            <CardBody className="p-5">
                <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div>
                        <p className="text-xs text-center">{t('admin.forget_password_description')}</p>
                    </div>
                    <Input
                        type="email"
                        label=""
                        placeholder={t('admin.email')}
                        labelPlacement="outside"
                        startContent={
                            <span className="shrink-0">
                                <Mail size={16} className="content-center text-default-400" aria-label={t('admin.email')} />
                            </span>
                        }
                        value={email}
                        onValueChange={(e) => setEmail(e)}
                        validationBehavior="aria"
                        onFocus={() => setErrors({ ...errors, email: '' })}
                        endContent={
                            errors.email
                                ? (
                                    <span className="text-danger-500 text-xs bg-default px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                                        {t(errors.email)}
                                    </span>
                                )
                                : null
                        }
                    />
                    <p className="text-center text-xs"><span>{t('admin.remember_password')}</span> <Link href="/login" className="content-center justify-self-end text-xs">{t('admin.login')}</Link></p>
                    <Button
                        type="submit"
                        color="primary"
                        isLoading={isPending}
                        isDisabled={countdown > 0}
                        onPress={handleSubmit}
                    >
                        {isPending ? t('admin.sending') : countdown > 0 ? `${t('admin.resend')} (${countdown}s)` : t('admin.send')}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}
