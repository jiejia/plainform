import DashboardLayout from '@/app/dashboard/dashboard-layout';
import React from "react";
import Link from "next/link";
import Block from "@/features/core/components/shared/block";

export default function Create() {
    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <Link href={"/dashboard/form"}>Form</Link> / <span>Create</span></>} menuItemId={2}>
            <div className="grid grid-rows-[56px_1fr_56px] gap-4 h-full">
                <Block>
                    <div>gererh</div>
                </Block>
                <Block>
                    <div>erh</div>
                </Block>
                <Block>
                    <div>ehr</div>
                </Block>
            </div>
        </DashboardLayout>
    );
}