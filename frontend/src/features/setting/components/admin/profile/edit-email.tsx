'use client'

import FormModal from "@/features/core/components/admin/form-modal";
import { Button, Input, PressEvent } from "@heroui/react";
import { ShieldCheck, Mail, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { updateEmailValidator, sendEmailResetCodeValidator } from "@/features/setting/validators/update-email";
import { msg } from "@/features/core/utils/ui";
import { updateEmail, sendEmailResetCode } from "@/features/admin/actions/auth-action";
import { useTranslations } from 'next-intl';
import ErrorMessage from "@/features/core/components/shared/error-message";

type errors = {
    email: string;
    code: string;
}


export default function EditEmail() {
    const t = useTranslations();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const [isPending, setIsPending] = useState(false);
    const [isCodePending, setIsCodePending] = useState(false);

    const [countdown, setCountdown] = useState(0);

    const [errors, setErrors] = useState<errors>({
        email: '',
        code: '',
    });

    // Countdown effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (countdown > 0) {
            interval = setInterval(() => {


            }, 1000);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [countdown]);

    async function handleSendEmailResetCode() {
        if (countdown > 0) {
            return;
        }

        setIsCodePending(true);

        // validate form data
        const result = sendEmailResetCodeValidator({ email: email });
        if (!result.success) {
            const { fieldErrors } = result.error.flatten();
            setErrors({
                email: fieldErrors.email?.[0] ?? '',
                code: '',
            });

            setIsCodePending(false);
            return;
        }

        const res = await sendEmailResetCode(email);
        if (res.code === 0) {
            msg(t('setting.send_email_reset_code_success'), t('setting.send_email_reset_code_success'), 'success');

            setCountdown(60); // Start 60 seconds countdown

        } else {
            msg(t('setting.send_email_reset_code_failed'), t(res.msg), 'warning');
        }

        setIsCodePending(false);
    }

    async function handleSubmit(e?: PressEvent | React.FormEvent) {
        // prevent default
        if (e && 'preventDefault' in e) {
            e.preventDefault();
        }

        setIsPending(true);

        // validate form data
        const result = updateEmailValidator({ email, code });
        if (!result.success) {
            const { fieldErrors } = result.error.flatten();
            setErrors({
                email: fieldErrors.email?.[0] ?? '',
                code: fieldErrors.code?.[0] ?? '',
            });

            setIsPending(false);
            return;
        }

        // reset password
        const res = await updateEmail(email, code);
        if (res.code === 0) {
            msg(t('setting.update_email_success'), t('setting.update_email_success'), 'success');

            // clear form
            setEmail('');
            setCode('');

            setIsPending(false);
            return

        } else {
            msg(t('setting.update_email_failed'), t(res.msg), 'warning');
        }

        setIsPending(false);
    }

    return (
        <FormModal title={t('setting.update_email')} button={
            <Button
                startContent={<SquarePen size={16} />}
                size="sm"
                color="primary"
                variant="flat"
            >{t('setting.update')}</Button>
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
                    >{isPending ? t('setting.submitting') : t('setting.submit')}</Button>
                </>
            }
        >
            <div className="grid grid-cols-[3fr_1fr] gap-2">
                <Input
                    type="email"
                    placeholder={t('setting.enter_email')}
                    label=""
                    labelPlacement="inside"
                    startContent={
                        <span className="shrink-0">
                            <Mail size={16} className="content-center text-default-400" />
                        </span>
                    }
                    value={email}
                    onValueChange={(e) => setEmail(e)}
                    size="sm"
                    onFocus={() => setErrors({ ...errors, email: '' })}
                    endContent={
                        errors.email && (
                            <ErrorMessage error={t(errors.email)} />
                        )
                    }
                />
                <Button
                    type="button"
                    size="sm"
                    color="primary"
                    variant="flat"
                    onPress={() => handleSendEmailResetCode()}
                    isLoading={isCodePending}
                    disabled={isCodePending || countdown > 0}
                >{isCodePending ? t('setting.sending') : countdown > 0 ? `${t('setting.resend')} (${countdown}s)` : t('setting.send_email_reset_code')}</Button>
            </div>

            <Input
                type="text"
                placeholder={t('setting.enter_code')}
                label=""
                labelPlacement="inside"
                startContent={
                    <span className="shrink-0">
                        <ShieldCheck size={16} className="content-center text-default-400" />
                    </span>
                }
                value={code}
                onValueChange={(e) => setCode(e)}
                size="sm"
                onFocus={() => setErrors({ ...errors, code: '' })}
                endContent={
                    errors.code && (
                        <ErrorMessage error={t(errors.code)} />
                    )
                }
            />
        </FormModal>
    );
}