import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";

export default function Create() {
    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <Link href={"/dashboard/form"}>Form</Link> / <span>Create</span></>} menuItemId={2}>
            <div></div>
        </DashboardLayout>
    );
}