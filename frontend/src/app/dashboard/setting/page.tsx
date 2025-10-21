import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import General from "@/features/setting/components/admin/general";
import { getOptions } from '@/features/setting/actions/setting-action';
import { Option } from '@/features/setting/types/general-option';
import { getTranslations } from 'next-intl/server';


export default async function Setting() {
    const options = await getOptions(['general', 'options']);
    const t = await getTranslations('setting');

    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>{t('dashboard')}</Link> / <span>{t('setting')}</span></>} menuItemId={3}>
            <General initialOptions={options.general as Option} languages={options.options.languages}/>
        </DashboardLayout>
    );
}