import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import Save from "@/features/form/components/admin/save";
import { getControls } from '@/features/form/actions/form-action';
import { Control } from '@/features/form/types/control';

export default async function Create() {

    const controls: Control[] = await getControls();

    console.log(controls);

    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <Link href={"/dashboard/form"}>Form</Link> / <span>Create</span></>} menuItemId={2}>
            <Save controls={controls}/>
        </DashboardLayout>
    );
}