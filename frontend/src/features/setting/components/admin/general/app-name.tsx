'use client'

import FormModal from "@/features/core/components/admin/form-modal";
import { Button, Input } from "@heroui/react";
import React, { useState } from "react";
import { SquarePen } from "lucide-react";
import { setOptions as setOptionsAction } from '@/features/setting/actions/setting-action';
import { appNameValidator } from '@/features/setting/validators/general-validator';
import { msg } from '@/features/core/utils/ui';
import { useTranslations } from 'next-intl';

type appNameError = {
    app_name: string;
}

export default function AppName({ options, setOptions }: { options: any, setOptions: any }) {
    const t = useTranslations();
    const [isPending, setIsPending] = useState(false);

    const [errors, setErrors] = useState<appNameError>({
        app_name: '',
    });

    const handleAppNameChange = (value: string) => {
        setOptions({ ...options, app_name: value });
    };

    const handleUpdateAppNameChange = async (value: string) => {
        setIsPending(true);

        const result = appNameValidator({ app_name: value });
        if (!result.success) {
            const { fieldErrors } = result.error.flatten();
            setErrors({
                app_name: fieldErrors.app_name?.[0] ?? '',
            });
            setIsPending(false);
            return;
        }

        // set options
        setOptions({ ...options, app_name: value });

        // set pending
        const res = await setOptionsAction('general', 'app_name', value);
        if (res.code === 0) {
            msg(t('setting.app_name_save_success'), t('setting.app_name_save_success'), 'success');
        } else {
            msg(t('setting.app_name_save_failed'), t(res.msg), 'warning');
        }
        setIsPending(false);
    };

    return (
        <FormModal title={t('setting.edit_app_name')} button={
            <Button
                startContent={<SquarePen size={16} />}
                size="sm"
                color="default"
                variant="flat"
            >{t('setting.edit')}</Button>
        }
            footer={
                <Button
                    type="submit"
                    size="sm"
                    color="primary"
                    variant="solid"
                    onPress={() => handleUpdateAppNameChange(options.app_name)}
                    isLoading={isPending}
                    disabled={isPending}
                >{isPending ? t('setting.saving') : t('setting.save')}</Button>
            }
        >
            <Input
                type="text"
                placeholder={t('setting.enter_app_name')}
                value={options.app_name}
                onValueChange={handleAppNameChange}
                maxLength={20}
                onFocus={() => setErrors({ ...errors, app_name: '' })}
                endContent={
                    errors.app_name && (
                        <span className="text-danger-500 text-xs bg-white px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                            {t(errors.app_name)}
                        </span>
                    )
                }
            />
        </FormModal>
    );
}