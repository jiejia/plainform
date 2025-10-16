'use client';

import {HeroUIProvider} from '@heroui/react'
import {ToastProvider} from "@heroui/toast";
import React from "react";
import { AppProvider } from "@/features/core/context/AppContext";
import { Setting } from "@/features/core/types/app";

export function Providers({children, setting, visitorLanguage, visitorTheme}: { children: React.ReactNode, setting: Setting, visitorLanguage: string, visitorTheme: string }) {
    
    
    return (
        <HeroUIProvider locale={visitorLanguage}>
            <AppProvider initialSetting={setting}>
                {children}
                <ToastProvider placement={"top-right"} toastOffset={10} maxVisibleToasts={3}/>
            </AppProvider>
        </HeroUIProvider>
    )
}