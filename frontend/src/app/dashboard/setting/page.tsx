import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";

export default function Setting() {
    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <span>Setting</span></>} menuItemId={3}>
            <div></div>
        </DashboardLayout>
    );
}