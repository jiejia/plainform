'use client';

import {HeroUIProvider} from '@heroui/react'
import {ToastProvider} from "@heroui/toast";
import React from "react";
import { AppProvider } from "@/features/core/context/AppContext";
import { Setting } from "@/features/core/types/app";

export function Providers({children, setting}: { children: React.ReactNode, setting: Setting }) {

    return (
        <HeroUIProvider locale={setting.general.default_language}>
            <AppProvider initialSetting={setting}>
                {children}
                <ToastProvider placement={"top-right"} toastOffset={50} maxVisibleToasts={3}/>
            </AppProvider>
        </HeroUIProvider>
    )
}