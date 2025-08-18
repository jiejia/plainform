import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import Profile from "@/features/setting/components/admin/profile";

export default function Setting() {
    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <Link href={"/dashboard/setting"}>Setting</Link> / <span>Profile</span></>} menuItemId={3}>
            <Profile/>
        </DashboardLayout>
    );
}