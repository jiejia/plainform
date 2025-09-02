'use client'

import FormModal from "@/features/core/components/admin/form-modal";
import { Button, Input } from "@heroui/react";
import React, { useState } from "react";
import { SquarePen } from "lucide-react";
import { setOptions as setOptionsAction } from '@/features/setting/actions/setting-action';
import { msg } from "@/features/core/utils/ui";
import { appDescriptionValidator } from "@/features/setting/validators/general-validator";

export default function AppDescription({ options, setOptions }: { options: any, setOptions: any }) {

    const [isPending, setIsPending] = useState(false);

    const handleUpdateAppDescriptionChange = async (value: string) => {
        setIsPending(true);

        const result = appDescriptionValidator({app_description: value});
        if (!result.success) {
            msg('应用描述不能为空', result.error.issues[0].message, 'warning');

            // sleep 0.5 second
            await new Promise(resolve => setTimeout(resolve, 500));

            setIsPending(false);
            return;
        }

        setOptions({...options, app_description: {value: value}});

        const res = await setOptionsAction('general', 'app_description', value);
        if (res === true) {
            msg('应用描述保存成功', '应用描述保存成功', 'success');
        } else {
            msg('应用描述保存失败', res, 'warning');
        }
        setIsPending(false);
    };

    const handleAppDescriptionChange = (value: string) => {
        setOptions({...options, app_description: {value: value}});
    };

    return (
        <FormModal title="编辑应用描述" button={
            <Button
                startContent={<SquarePen size={16}/>}
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
                    onPress={() => handleUpdateAppDescriptionChange(options.app_description.value)}
                >{isPending ? '保存中...' : '保存'}</Button>
            }>
                <Input type="text" placeholder="请输入应用描述" value={options.app_description.value} onValueChange={handleAppDescriptionChange} />
            </FormModal>
    );
}