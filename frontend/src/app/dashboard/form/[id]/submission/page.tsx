import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import Index from "@/features/form/components/admin/submission";

export default function Submission() {
    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <Link href={"/dashboard/form"}>Form</Link> / <span>Submissions</span></>} menuItemId={2}>
            <Index/>
        </DashboardLayout>
    );
}