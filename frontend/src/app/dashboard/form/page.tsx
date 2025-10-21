import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import List from "@/features/form/components/admin/list";
import { getTranslations } from 'next-intl/server';

export default async function Form() {
    const t = await getTranslations();
    
    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>{t('core.menu_dashboard')}</Link> / <span>{t('core.menu_form')}</span></>} menuItemId={2}>
            <List/>
        </DashboardLayout>
    );
}