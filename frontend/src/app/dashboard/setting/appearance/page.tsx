import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import Appearance from "@/features/setting/components/admin/appearance";
import { getOptions } from "@/features/setting/actions/setting-action";
import { Option } from '@/features/setting/types/appearance-option';
import { getTranslations } from 'next-intl/server';

export default async function Setting() {

    const res = await getOptions(['appearances']);
    const t = await getTranslations('setting');
    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>{t('dashboard')}</Link> / <Link href={"/dashboard/setting"}>{t('setting')}</Link> / <span>{t('appearance')}</span></>} menuItemId={3}>
            <Appearance initialOptions={res.data.appearances as Option}/>
        </DashboardLayout>
    );
}