'use client';

import {HeroUIProvider} from '@heroui/react'
import {ToastProvider} from "@heroui/toast";
import React from "react";
import { AppProvider } from "@/features/core/context/AppContext";

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <HeroUIProvider locale="zh-CN">
            <AppProvider>
                {children}
                <ToastProvider placement={"top-right"} toastOffset={10} maxVisibleToasts={3}/>
            </AppProvider>
        </HeroUIProvider>
    )
}