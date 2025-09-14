import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import Appearance from "@/features/setting/components/admin/appearance";
import { getOptions } from "@/features/setting/actions/setting-action";
import { Option } from '@/features/setting/types/appearance-option';

export default async function Setting() {

    const options = await getOptions('appearances');
    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <Link href={"/dashboard/setting"}>Setting</Link> / <span>Appearance</span></>} menuItemId={3}>
            <Appearance initialOptions={options.appearances as Option}/>
        </DashboardLayout>
    );
}