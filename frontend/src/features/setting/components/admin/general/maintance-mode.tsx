'use client'

import { Switch } from "@heroui/react";
import React, { ChangeEvent } from "react";
import { setOptions as setOptionsAction } from '@/features/setting/actions/setting-action';

export default function MaintanceMode({ options, setOptions }: { options: any, setOptions: any }) {

    const handleMaintenanceModeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked; 
        setOptions({...options, maintenance_mode: {value: value as boolean}});
        setOptionsAction('general', 'maintenance_mode', value as boolean);
    };

    return (
        <Switch
        isSelected={options.maintenance_mode.value as boolean}
        onChange={(e) => handleMaintenanceModeChange(e)}
        aria-label="Automatic updates"
        size="sm"
        id="maintance"
    />
    );
}