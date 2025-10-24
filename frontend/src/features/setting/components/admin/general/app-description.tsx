'use client'

import FormModal from "@/features/core/components/admin/form-modal";
import { Button, Input } from "@heroui/react";
import React, { useState } from "react";
import { SquarePen } from "lucide-react";
import { setOptions as setOptionsAction } from '@/features/setting/actions/setting-action';
import { msg } from "@/features/core/utils/ui";
import { appDescriptionValidator } from "@/features/setting/validators/general-validator";
import { useTranslations } from 'next-intl';
import ErrorMessage from "@/features/core/components/shared/error-message";

type appDescriptionError = {
    app_description: string;
}

export default function AppDescription({ options, setOptions }: { options: any, setOptions: any }) {
    const t = useTranslations();
    const [isPending, setIsPending] = useState(false);

    const [errors, setErrors] = useState<appDescriptionError>({
        app_description: '',
    });

    const handleUpdateAppDescriptionChange = async (value: string) => {
        setIsPending(true);

        const result = appDescriptionValidator({ app_description: value });
        if (!result.success) {
            const { fieldErrors } = result.error.flatten();
            setErrors({
                app_description: fieldErrors.app_description?.[0] ?? '',
            });

            // sleep 0.5 second
            // await new Promise(resolve => setTimeout(resolve, 500));

            setIsPending(false);
            return;
        }

        setOptions({ ...options, app_description: value });

        const res = await setOptionsAction('general', 'app_description', value);
        if (res.code === 0) {
            msg(t('setting.app_description_save_success'), t('setting.app_description_save_success'), 'success');
        } else {
            msg(t('setting.app_description_save_failed'), t(res.msg), 'warning');
        }
        setIsPending(false);
    };

    const handleAppDescriptionChange = (value: string) => {
        setOptions({ ...options, app_description: value });
    };

    return (
        <FormModal title={t('setting.edit_app_description')} button={
            <Button
                startContent={<SquarePen size={16} />}
                size="sm"
                color="default" variant="flat"
            >{t('setting.edit')}</Button>
        }
            footer={
                <Button
                    type="submit"
                    size="sm"
                    color="primary"
                    variant="solid"
                    isLoading={isPending}
                    disabled={isPending}
                    onPress={() => handleUpdateAppDescriptionChange(options.app_description)}
                >{isPending ? t('setting.saving') : t('setting.save')}</Button>
            }>
            <Input
                type="text"
                placeholder={t('setting.enter_app_description')}
                value={options.app_description} onValueChange={handleAppDescriptionChange}
                onFocus={() => setErrors({ ...errors, app_description: '' })} endContent={
                    errors.app_description && (
                        <ErrorMessage error={t(errors.app_description)} />
                    )
                } />
        </FormModal>
    );
}