'use client'

import Block from "@/features/core/components/shared/block";
import Link from "next/link";
import Image from "next/image";
import {Select, SelectItem, Button, Card, CardHeader, CardBody, CardFooter} from "@heroui/react";
import Copyright from "@/features/core/components/admin/copyright";
import clsx from "clsx";
import { LayoutDashboard, FileText, Settings, Sun, Moon, Monitor } from "lucide-react";
import { useRouter } from "next/navigation";
import { Shell } from "lucide-react";
import { useTranslations } from 'next-intl';


export default function Sidebar({menuItemId}: { menuItemId: number }) {
    const router = useRouter();
    const t = useTranslations('core');

    const menuItems = [
        {
            id: 1,
            name: t('menu_dashboard'),
            href: "/dashboard",
            icon: <LayoutDashboard size={15} />
        },
        {
            id: 2,
            name: t('menu_form'),
            href: "/dashboard/form",
            icon: <FileText size={15} />
        },
        {
            id: 3,
            name: t('menu_setting'),
            href: "/dashboard/setting",
            icon: <Settings size={15} />
        },
    ]

    return (
        <aside className="h-full lg:block hidden">
            <Card className="h-full w-[280px] relative">
                <CardHeader>
                    <h1 className="text-xl font-semibold lg:px-8 w-full">
                        <Link href={"/dashboard"}
                              className="grid grid-flow-col grid-cols-[40px_1fr] hover:text-slate-500">
                            <Shell size={32} className="w-8 h-8 inline text-primary-600"/>
                            <span className="text-2xl font-semibold pl-1 text-primary-600 inline-block align-middle">PlainForm</span>
                        </Link>
                    </h1>
                </CardHeader>
                <CardBody className="p-5">
                    <ul className="grid grid-flow-row text-sm gap-1">
                        {
                            menuItems.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Button
                                            fullWidth
                                            variant={item.id == menuItemId ? "flat" : "light"}
                                            className={clsx("justify-start", {
                                                "bg-primary-500 text-primary-foreground": item.id == menuItemId
                                            })}
                                            color={item.id == menuItemId ? "default" : "primary"}
                                            startContent={item.icon}
                                            onPress={() => router.push(item.href)}
                                        >
                                            {item.name}
                                        </Button>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </CardBody>
                <CardFooter>
                    <Copyright/>
                </CardFooter>
            </Card>
        </aside>
    )
        ;
}
