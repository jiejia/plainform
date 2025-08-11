import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";

export default function Form() {
    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <span>Form</span></>} menuItemId={2}>
            <div></div>
        </DashboardLayout>
    );
}