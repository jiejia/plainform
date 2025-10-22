import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import Index from "@/features/form/components/admin/submission";
import { get, getVersions } from '@/features/form/actions/admin/form-action';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

interface SubmissionProps {
    params: Promise<{ id: string }>;
}

export default async function Submission({ params }: SubmissionProps) {
    const t = await getTranslations();

    // get form
    const { id } = await params;
    const res = await get(id as unknown as number);

    // if form not found, return 404
    if (res.code !== 0) {
        notFound();
    }

    // get versions
    const versionsRes = await getVersions(id as unknown as number) || []; 
    if (versionsRes.code !== 0) {   
        notFound();
    }
    const versions = versionsRes.data as number[];

    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>{t('core.menu_dashboard')}</Link> / <Link href={"/dashboard/form"}>{t('core.menu_form')}</Link> / <Link href={"/dashboard/form/" + id}>{res.data.title}</Link> / <span>{t('form.submissions_count')}</span></>} menuItemId={2}>
            <Index form={res.data} versions={versionsRes.data} />
        </DashboardLayout>
    );
}