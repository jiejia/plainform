'use client'

import { Switch } from "@heroui/react";
import React, { ChangeEvent } from "react";
import { setOptions as setOptionsAction } from '@/features/setting/actions/setting-action';
import { useTranslations } from 'next-intl';
import { msg } from "@/features/core/utils/ui";

export default function MaintanceMode({ options, setOptions }: { options: any, setOptions: any }) {
    const t = useTranslations();
    const handleMaintenanceModeChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        setOptions({ ...options, maintenance_mode: value as boolean });
        const res = await setOptionsAction('general', 'maintenance_mode', value as boolean);
        if (res.code === 0) {
            msg(t('setting.maintenance_mode_save_success'), t('setting.maintenance_mode_save_success'), 'success');
        } else {
            msg(t('setting.maintenance_mode_save_failed'), t(res.msg), 'warning');
        }
    };

    return (
        <Switch
            isSelected={options.maintenance_mode as boolean}
            onChange={(e) => handleMaintenanceModeChange(e)}
            aria-label="Automatic updates"
            size="sm"
            id="maintance"
        />
    );
}