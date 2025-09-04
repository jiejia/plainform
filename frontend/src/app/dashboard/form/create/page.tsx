import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import Save from "@/features/form/components/admin/save";
import { getControls } from '@/features/form/actions/form-action';
import { Control } from '@/features/form/types/control';
import { Field } from '@/features/form/types/field';

export default async function Create() {

    const initialControls: Control[] = await getControls();

    const initialFields: Field[] = [];

    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <Link href={"/dashboard/form"}>Form</Link> / <span>Create</span></>} menuItemId={2}>
            <Save initialControls={initialControls} initialFields={initialFields}/>
        </DashboardLayout>
    );
}