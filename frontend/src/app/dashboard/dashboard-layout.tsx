'use client'

import Sidebar from "@/features/core/components/admin/sidebar";
import Header from "@/features/core/components/admin/header";
import ThemeToggle from "@/features/core/components/shared/theme-toggle";
import { useState } from "react";

export default function DashboardLayout({children, breadcrumbs, menuItemId}: {
    children: React.ReactNode,
    breadcrumbs: React.ReactNode,
    menuItemId: number
}) {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="relative">
            <ThemeToggle className="absolute top-2 right-2 z-1000" />
            <div className="fixed left-0 top-0 right-0 bottom-0 grid lg:grid-cols-[280px_1fr] grid-cols-[1fr] gap-4 p-4">
                <Sidebar menuItemId={menuItemId} sidebarOpen={sidebarOpen} />
                <div className="h-full grid grid-rows-[56px_1fr] gap-4">
                    <Header breadcrumbs={breadcrumbs} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                    <main className="h-full">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}