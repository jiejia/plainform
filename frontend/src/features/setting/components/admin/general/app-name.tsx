'use client'

import FormModal from "@/features/core/components/admin/form-modal";
import { Button, Input } from "@heroui/react";
import React from "react";
import { SquarePen } from "lucide-react";
import { setOptions as setOptionsAction } from '@/features/setting/actions/setting-action';

export default function AppName({ options, setOptions }: { options: any, setOptions: any }) {

    const handleAppNameChange = (value: string) => {
        setOptions({...options, app_name: {value: value}});
    };

    const handleUpdateAppNameChange = (value: string) => {
        setOptions({...options, app_name: {value: value}});
        setOptionsAction('general', 'app_name', value);
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
                    onPress={() => handleUpdateAppNameChange(options.app_name.value)}
                >保存</Button>
            }
        >
            <Input type="text" placeholder="请输入应用名称" value={options.app_name.value} onValueChange={handleAppNameChange} />
        </FormModal>
    );
}