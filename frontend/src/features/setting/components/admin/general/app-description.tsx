'use client'

import FormModal from "@/features/core/components/admin/form-modal";
import { Button, Input } from "@heroui/react";
import React, { useState } from "react";
import { SquarePen } from "lucide-react";
import { setOptions as setOptionsAction } from '@/features/setting/actions/setting-action';
import { msg } from "@/features/core/utils/ui";
import { appDescriptionValidator } from "@/features/setting/validators/general-validator";

type appDescriptionError = {
    app_description: string;
}

export default function AppDescription({ options, setOptions }: { options: any, setOptions: any }) {

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
        if (res === true) {
            msg('应用描述保存成功', '应用描述保存成功', 'success');
        } else {
            msg('应用描述保存失败', res, 'warning');
        }
        setIsPending(false);
    };

    const handleAppDescriptionChange = (value: string) => {
        setOptions({ ...options, app_description: value });
    };

    return (
        <FormModal title="编辑应用描述" button={
            <Button
                startContent={<SquarePen size={16} />}
                size="sm"
                color="default" variant="flat"
            >编辑</Button>
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
                >{isPending ? '保存中...' : '保存'}</Button>
            }>
            <Input
                type="text"
                placeholder="请输入应用描述"
                value={options.app_description} onValueChange={handleAppDescriptionChange}
                onFocus={() => setErrors({ ...errors, app_description: '' })} endContent={
                    errors.app_description && (
                        <span className="text-danger-500 text-xs bg-white px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                            {errors.app_description}
                        </span>
                    )
                } />
        </FormModal>
    );
}