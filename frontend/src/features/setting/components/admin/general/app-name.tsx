'use client'

import FormModal from "@/features/core/components/admin/form-modal";
import { Button, Input } from "@heroui/react";
import React, { useState } from "react";
import { SquarePen } from "lucide-react";
import { setOptions as setOptionsAction } from '@/features/setting/actions/setting-action';
import { appNameValidator } from '@/features/setting/validators/general-validator';
import { msg } from '@/features/core/utils/ui';

type appNameError = {
    app_name: string;
}

export default function AppName({ options, setOptions }: { options: any, setOptions: any }) {

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

        setOptions({ ...options, app_name: value });

        const res = await setOptionsAction('general', 'app_name', value);
        if (res === true) {
            msg('应用名称保存成功', '应用名称保存成功', 'success');
        } else {
            msg('应用名称保存失败', res, 'warning');
        }

        setIsPending(false);
    };

    return (
        <FormModal title="编辑应用名称" button={
            <Button
                startContent={<SquarePen size={16} />}
                size="sm"
                color="default"
                variant="flat"
            >编辑</Button>
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
                >{isPending ? '保存中...' : '保存'}</Button>
            }
        >
            <Input
                type="text"
                placeholder="请输入应用名称"
                value={options.app_name}
                onValueChange={handleAppNameChange}
                maxLength={20}
                onFocus={() => setErrors({ ...errors, app_name: '' })}
                endContent={
                    errors.app_name && (
                        <span className="text-danger-500 text-xs bg-white px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                            {errors.app_name}
                        </span>
                    )
                }
            />
        </FormModal>
    );
}