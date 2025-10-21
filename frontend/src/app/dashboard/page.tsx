import React from "react";
import DashboardLayout from '@/app/dashboard/dashboard-layout';
import Index from '@/features/dashboard/components/admin/statistics';
import { getStatistic } from "@/features/dashboard/actions/dashoboard-actions";
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export default async function Dashboard() {
    
    const res = await getStatistic();
    const t = await getTranslations('dashboard');
    
    return (
        <DashboardLayout breadcrumbs={<><span>{t('dashboard')}</span></>} menuItemId={1}>
            <Index initialData={res.data}/>
        </DashboardLayout>
    );
}
