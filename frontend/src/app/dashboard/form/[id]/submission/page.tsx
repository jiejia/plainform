import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import Index from "@/features/form/components/admin/submission";
import { get, getVersions } from '@/features/form/actions/admin/form-action';
import { notFound } from 'next/navigation';

interface SubmissionProps {
    params: Promise<{ id: string }>;
}

export default async function Submission({ params }: SubmissionProps) {

    // get form
    const { id } = await params;
    const res = await get(id as unknown as number);

    // if form not found, return 404
    if (res.code !== 0) {
        notFound();
    }

    // get versions
    const versionsRes = await getVersions(id as unknown as number) || []; 

    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <Link href={"/dashboard/form"}>Form</Link> / <Link href={"/dashboard/form/" + id}>{res.data.title}</Link> 的 <span>Submissions</span></>} menuItemId={2}>
            <Index form={res.data} versions={versionsRes.data} />
        </DashboardLayout>
    );
}