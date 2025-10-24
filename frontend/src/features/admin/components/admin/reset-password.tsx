'use client'

import { Input, Button, Card, CardHeader, CardBody, Divider, PressEvent } from "@heroui/react";
import { Lock } from "lucide-react";
import { Link } from "@heroui/link";
import { useState, useEffect } from "react";
import { msg } from "@/features/core/utils/ui";
import { resetPasswordByEmail } from "@/features/admin/actions/auth-action";
import { resetPasswordValidator } from "@/features/admin/validators/reset-password-validator";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import ErrorMessage from "@/features/core/components/shared/error-message";

type resetPasswordError = {
    newPassword: string;
    confirmPassword: string;
}

export default function ResetPassword() {
    const t = useTranslations();

    const router = useRouter();

    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    const resetPasswordToken = searchParams.get('token') || '';

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [errors, setErrors] = useState<resetPasswordError>({
        newPassword: '',
        confirmPassword: ''
    });


    async function handleSubmit(e?: PressEvent | React.FormEvent) {
        // 阻止表单默认提交行为
        if (e && 'preventDefault' in e) {
            e.preventDefault();
        }

        setIsPending(true);

        // validate form data
        const result = resetPasswordValidator({ newPassword, confirmPassword });
        if (!result.success) {
            const { fieldErrors } = result.error.flatten();
            setErrors({
                newPassword: fieldErrors.newPassword?.[0] ?? '',
                confirmPassword: fieldErrors.confirmPassword?.[0] ?? '',
            });


            setIsPending(false);
            return;
        }

        // reset password
        const res = await resetPasswordByEmail(email, newPassword, confirmPassword, resetPasswordToken);
        if (res.code === 0) {
            msg(t('admin.reset_success'), t('admin.reset_success'), 'success');
            router.push('/login');
        } else {
            msg(t('admin.reset_failed'), t(res.msg), 'warning');
        }

        setIsPending(false);
    }

    return (
        <Card className="w-full mt-5">
            <CardHeader className="text-center">
                <h2 className="text-center text-lg font-normal block w-full">{t('admin.reset_password')}</h2>
            </CardHeader>
            <Divider />
            <CardBody className="p-5">

                <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div>
                        <p className="text-xs text-center">{t('admin.reset_password_description')}</p>
                    </div>
                    <Input
                        type="password"
                        label=""
                        placeholder={t('admin.new_password')}
                        labelPlacement="outside"
                        startContent={
                            <span className="shrink-0">
                                <Lock size={16} className="content-center text-default-400" aria-label={t('admin.new_password')} />
                            </span>
                        }
                        value={newPassword}
                        onValueChange={(e) => setNewPassword(e)}
                        validationBehavior="aria"
                        onFocus={() => setErrors({ ...errors, newPassword: '' })}
                        endContent={
                            errors.newPassword && (
                                <ErrorMessage error={t(errors.newPassword)} />
                            )
                        }
                    />

                    <Input
                        type="password"
                        label=""
                        placeholder={t('admin.confirm_new_password')}
                        labelPlacement="outside"
                        startContent={
                            <span className="shrink-0">
                                <Lock size={16} className="content-center text-default-400" aria-label={t('admin.confirm_new_password')} />
                            </span>
                        }
                        value={confirmPassword}
                        onValueChange={(e) => setConfirmPassword(e)}
                        validationBehavior="aria"
                        onFocus={() => setErrors({ ...errors, confirmPassword: '' })}
                        endContent={
                            errors.confirmPassword && (
                                <ErrorMessage error={t(errors.confirmPassword)} />
                            )
                        }
                    />
                    <p className="text-center text-xs"><span>{t('admin.reset_problem')}</span> <Link href="/forget-password" className="content-center justify-self-end text-xs">{t('admin.resend')}</Link></p>
                    <Button
                        type="submit"
                        color="primary"
                        isLoading={isPending}
                        onPress={handleSubmit}
                    >
                        {isPending ? t('admin.resetting') : t('admin.reset')}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}
