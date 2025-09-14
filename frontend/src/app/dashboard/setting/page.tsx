import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import General from "@/features/setting/components/admin/general";
import { getOptions } from '@/features/setting/actions/setting-action';
import { Option } from '@/features/setting/types/general-option';

export default async function Setting() {
    const options = await getOptions('general');

    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <span>Setting</span></>} menuItemId={3}>
            <General initialOptions={options.general as Option}/>
        </DashboardLayout>
    );
}