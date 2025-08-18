import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import Appearance from "@/features/setting/components/admin/appearance";

export default function Setting() {
    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <Link href={"/dashboard/setting"}>Setting</Link> / <span>Appearance</span></>} menuItemId={3}>
            <Appearance/>
        </DashboardLayout>
    );
}