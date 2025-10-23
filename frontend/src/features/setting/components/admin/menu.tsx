'use client'

import { Button, Card, CardBody } from "@heroui/react";
import { Settings, User, Palette } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';




interface MenuProps {
    activeItem?: string;
    onItemClick?: (itemId: string) => void;
}

export default function Menu({ activeItem = 'general', onItemClick }: MenuProps) {
    const router = useRouter();

    const handleItemClick = (itemId: string, url: string) => {
        // 先执行自定义回调
        onItemClick?.(itemId);
        // 然后进行路由跳转
        router.push(url);
    };
    const t = useTranslations();

    // 菜单项常量数组
    const MENU_ITEMS = [
        {
            id: 'general',
            label: t('setting.general'),
            icon: Settings,
            url: '/dashboard/setting',
        },
        {
            id: 'profile',
            label: t('setting.profile'),
            icon: User,
            url: '/dashboard/setting/profile',
        },
        {
            id: 'appearance',
            label: t('setting.appearance'),
            icon: Palette,
            url: '/dashboard/setting/appearance',
        },
        // {
        //     id: 'mcp',
        //     label: 'MCP',
        //     icon: Server,
        //     url: '/dashboard/setting/mcp',
        // },
        // {
        //     id: 'integration',
        //     label: 'Integration',
        //     icon: Puzzle,
        //     url: '/dashboard/setting/integration',
        // },
        // {
        //     id: 'notification',
        //     label: 'Notification',
        //     icon: Bell,
        //     url: '/dashboard/setting/notification',
        // },
    ];



    return (
        <Card>
            <CardBody>
                <ul className="grid gap-2">
                    {MENU_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeItem === item.id;

                        return (
                            <li key={item.id}>
                                <Button
                                    fullWidth
                                    variant={isActive ? "flat" : "light"}
                                    color={isActive ? "primary" : "default"}
                                    className={`justify-center sm:justify-start px-0 sm:px-3 min-w-0 ${isActive ? "bg-primary-50 text-primary" : ""
                                        }`}
                                    startContent={<span className="hidden sm:inline"><Icon size={16} /></span>}
                                    onClick={() => handleItemClick(item.id, item.url)}
                                >
                                    <span className="sm:hidden"><Icon size={16} /></span>
                                    <span className="hidden sm:inline">{item.label}</span>
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            </CardBody>
        </Card>
    );
}