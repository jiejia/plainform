import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import Save from "@/features/form/components/admin/save";
import { getControls } from '@/features/form/actions/admin/form-action';
import { Control } from '@/features/form/types/control';
import { Field } from '@/features/form/types/field';
import { Form } from '@/features/form/types/form';
import { get } from '@/features/form/actions/admin/form-action';
import { notFound } from 'next/navigation';

interface EditProps {
    params: Promise<{ id: string }>;
}


export default async function Edit({ params }: EditProps) {
    // get controls
    const initialControls: Control[] = await getControls();

    // get form
    const { id } = await params;
    const res = await get(id as unknown as number);

    // if form not found, return 404
    if (res.code !== 0) {
        notFound();
    }

    // get initial form and fields
    const initialForm: Form = res.data as Form;
    const initialFields: Field[] = initialForm.fields as Field[];

    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <Link href={"/dashboard/form"}>Form</Link> / <span>Edit</span></>} menuItemId={2}>
            <Save initialControls={initialControls} initialFields={initialFields} initialForm={initialForm}/>
        </DashboardLayout>
    );
}