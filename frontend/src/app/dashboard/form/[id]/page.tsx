import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import Save from "@/features/form/components/admin/save";

export default function Detail() {
    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <Link href={"/dashboard/form"}>Form</Link> / <span>Detail</span></>} menuItemId={2}>
            <Save/>
        </DashboardLayout>
    );
}