'use client'

import FormModal from "@/features/core/components/admin/form-modal";
import { Button, Input } from "@heroui/react";
import React from "react";
import { SquarePen } from "lucide-react";
import { setOptions as setOptionsAction } from '@/features/setting/actions/setting-action';

export default function AppDescription({ options, setOptions }: { options: any, setOptions: any }) {

    const handleAppDescriptionChange = (value: string) => {
        setOptions({...options, app_description: {value: value}});
        setOptionsAction('general', 'app_description', value);
    };

    return (
        <FormModal title="编辑应用描述" footer={null} button={
            <Button
                startContent={<SquarePen size={16}/>}
                size="sm"
                color="default" variant="flat"
            >编辑</Button>
            }>
                <Input type="text" placeholder="请输入应用描述" value={options.app_description.value} onValueChange={handleAppDescriptionChange} />
            </FormModal>
    );
}