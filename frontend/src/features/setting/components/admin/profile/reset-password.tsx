'use client'

import FormModal from "@/features/core/components/admin/form-modal";
import { Button, Input, PressEvent } from "@heroui/react";
import { Lock, SquarePen } from "lucide-react";
import { useState } from "react";
import { resetPasswordValidator } from "@/features/setting/validators/reset-password-validator";
import { msg } from "@/features/core/utils/ui";
import { resetPassword } from "@/features/admin/actions/auth-action";
import { useTranslations } from 'next-intl';

type errors = {
    oldPassword: string;
    Password: string;
    confirmPassword: string;
}

export default function ResetPassword() {
    const t = useTranslations('setting');
    const [oldPassword, setOldPassword] = useState('');
    const [Password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isPending, setIsPending] = useState(false);

    const [errors, setErrors] = useState<errors>({
        oldPassword: '',
        Password: '',
        confirmPassword: '',
    });

    async function handleSubmit(e?: PressEvent | React.FormEvent) {
        // prevent default
        if (e && 'preventDefault' in e) {
            e.preventDefault();
        }

        setIsPending(true);

        // validate form data
        const result = resetPasswordValidator({ oldPassword, Password, confirmPassword });
        if (!result.success) {
            const { fieldErrors } = result.error.flatten();
            setErrors({
                oldPassword: fieldErrors.oldPassword?.[0] ?? '',
                Password: fieldErrors.Password?.[0] ?? '',
                confirmPassword: fieldErrors.confirmPassword?.[0] ?? '',
            });

            setIsPending(false);
            return;
        }

        // reset password
        const res = await resetPassword(oldPassword, Password, confirmPassword);
        if (res === true) {
            msg(t('update_password_success'), t('update_password_success'), 'success');

            // clear form
            setOldPassword('');
            setPassword('');
            setConfirmPassword('');

            setIsPending(false);
            return

        } else {
            msg(t('update_password_failed'), t(res), 'warning');
        }

        setIsPending(false);
    }

    return (
        <FormModal title={t('update_password')} button={
            <Button
                startContent={<SquarePen size={16} />}
                size="sm"
                color="primary"
                variant="flat"
            >{t('update')}</Button>
        }
            footer={
                <>
                    <Button
                        type="submit"
                        size="sm"
                        color="primary"
                        variant="solid"
                        isLoading={isPending}
                        disabled={isPending}
                        onPress={handleSubmit}
                    >{isPending ? t('submitting') : t('submit')}</Button>
                </>
            }
        >
            <Input
                type="password"
                placeholder={t('enter_old_password')}
                label=""
                labelPlacement="inside"
                startContent={
                    <span className="shrink-0">
                        <Lock size={16} className="content-center text-default-400" />
                    </span>
                }
                value={oldPassword}
                onValueChange={(e) => setOldPassword(e)}
                size="sm"
                onFocus={() => setErrors({ ...errors, oldPassword: '' })}
                endContent={
                    errors.oldPassword && (
                        <span className="text-danger-500 text-xs bg-white px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                            {t(errors.oldPassword)}
                        </span>
                    )
                }
            />
            <Input
                type="password"
                placeholder={t('enter_new_password')}
                label=""
                labelPlacement="inside"
                startContent={
                    <span className="shrink-0">
                        <Lock size={16} className="content-center text-default-400" />
                    </span>
                }
                value={Password}
                onValueChange={(e) => setPassword(e)}
                size="sm"
                onFocus={() => setErrors({ ...errors, Password: '' })}
                endContent={
                    errors.Password && (
                        <span className="text-danger-500 text-xs bg-white px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                            {t(errors.Password)}
                        </span>
                    )
                }
            />
            <Input
                type="password"
                placeholder={t('enter_confirm_password')}
                label=""
                labelPlacement="inside"
                startContent={
                    <span className="shrink-0">
                        <Lock size={16} className="content-center text-default-400" />
                    </span>
                }
                value={confirmPassword}
                onValueChange={(e) => setConfirmPassword(e)}
                size="sm"
                onFocus={() => setErrors({ ...errors, confirmPassword: '' })}
                endContent={
                    errors.confirmPassword && (
                        <span className="text-danger-500 text-xs bg-white px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                            {t(errors.confirmPassword)}
                        </span>
                    )
                }
            />
        </FormModal>
    );
}