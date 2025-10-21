import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import Save from "@/features/form/components/admin/save";
import { getControls } from '@/features/form/actions/admin/form-action';
import { Control } from '@/features/form/types/control';
import { Field } from '@/features/form/types/field';
import { Form } from '@/features/form/types/form';
import { getTranslations } from 'next-intl/server';

export default async function Create() {
    const t = await getTranslations();

    const initialControls: Control[] = await getControls();

    const initialFields: Field[] = [];

    const initialForm: Form = {
        title: "",
        description: "",
        enabled: true,
        numbering_style: 0,
    };

    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>{t('core.menu_dashboard')}</Link> / <Link href={"/dashboard/form"}>{t('core.menu_form')}</Link> / <span>{t('form.create')}</span></>} menuItemId={2}>
            <Save initialControls={initialControls} initialFields={initialFields} initialForm={initialForm}/>
        </DashboardLayout>
    );
}