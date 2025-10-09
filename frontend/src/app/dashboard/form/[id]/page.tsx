import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import Index from "@/features/form/components/admin/detail";
export default function Detail() {
    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <Link href={"/dashboard/form"}>Form</Link> / <span>Detail</span></>} menuItemId={2}>
            <Index />
        </DashboardLayout>
    );
}