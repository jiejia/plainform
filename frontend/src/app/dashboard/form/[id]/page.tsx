import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import Index from "@/features/form/components/admin/detail";
import { get } from '@/features/form/actions/admin/form-action';
import { statistics, getVersions } from "@/features/form/actions/admin/form-action";
import { notFound } from 'next/navigation';

interface DetailProps {
    params: Promise<{ id: string }>;
}

export default async function Detail({ params }: DetailProps) {

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
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <Link href={"/dashboard/form"}>Form</Link> / <span>Detail</span></>} menuItemId={2}>
            <Index initialData={data.data} formId={id as unknown as number} versions={versions.data} />
        </DashboardLayout>
    );
}