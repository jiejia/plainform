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
import { getTranslations } from 'next-intl/server';
import { Result } from '@/features/core/types/result';

interface EditProps {
    params: Promise<{ id: string }>;
}


export default async function Edit({ params }: EditProps) {
    const t = await getTranslations();
    
    // get controls
    const initialControlsRes = await getControls();
    if (initialControlsRes.code !== 0) {
        const initialControls: Control[] = [];
    }
    const initialControls = initialControlsRes.data as Control[];

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
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>{t('core.menu_dashboard')}</Link> / <Link href={"/dashboard/form"}>{t('core.menu_form')}</Link> / <span>{t('form.edit')}</span></>} menuItemId={2}>
            <Save initialControls={initialControls} initialFields={initialFields} initialForm={initialForm}/>
        </DashboardLayout>
    );
}