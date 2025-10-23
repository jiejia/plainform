import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import Profile from "@/features/setting/components/admin/profile";
import { getTranslations } from 'next-intl/server';

export default async function Setting() {
    const t = await getTranslations();
    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>{t('setting.dashboard')}</Link> / <Link href={"/dashboard/setting"}>{t('setting.setting')}</Link> / <span>{t('setting.profile')}</span></>} menuItemId={3}>
            <Profile/>
        </DashboardLayout>
    );
}