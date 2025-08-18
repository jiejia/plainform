import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import General from "@/features/setting/components/admin/general";

export default function Setting() {
    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <span>Setting</span></>} menuItemId={3}>
            <General/>
        </DashboardLayout>
    );
}