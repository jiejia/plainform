import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import Index from "@/features/form/components/admin/detail";
import { get } from '@/features/form/actions/admin/form-action';
import { statistics, getVersions } from "@/features/form/actions/admin/form-action";
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Statistic } from '@/features/form/types/statistic';

interface DetailProps {
    params: Promise<{ id: string }>;
}

export default async function Detail({ params }: DetailProps) {
    const t = await getTranslations();

    // get form
    const { id } = await params;
    const res = await get(id as unknown as number);

    // if form not found, return 404
    if (res.code !== 0) {
        notFound();
    }

    // get versions
    const versions = await getVersions(id as unknown as number);
    if (versions.code !== 0) {
        notFound();
    }

    // get statistics
    const data = await statistics(id as unknown as number, versions.data[0] || null, "today");
    if (data.code !== 0) {
        notFound();
    }

    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>{t('core.menu_dashboard')}</Link> / <Link href={"/dashboard/form"}>{t('core.menu_form')}</Link> / <span>{t('form.view')}</span></>} menuItemId={2}>
            <Index initialData={data.data as Statistic} formId={id as unknown as number} versions={versions.data} />
        </DashboardLayout>
    );
}