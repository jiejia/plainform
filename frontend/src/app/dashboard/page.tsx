import React from "react";
import DashboardLayout from '@/app/dashboard/dashboard-layout';
import Index from '@/features/dashboard/components/admin/statistics';
import { getStatistic } from "@/features/dashboard/actions/dashoboard-actions";

export default async function Dashboard() {
    
    const res = await getStatistic();
    
    return (
        <DashboardLayout breadcrumbs={<><span>Dashboard</span></>} menuItemId={1}>
            <Index initialData={res.data}/>
        </DashboardLayout>
    );
}
