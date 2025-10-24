'use client'

import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Card, CardBody} from "@heroui/react"
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from "@/features/admin/actions/auth-action";
import { useAppContext } from "@/features/core/context/AppContext";
import { useTranslations } from 'next-intl';
import {PanelLeft} from "lucide-react";
import { Button } from "@heroui/react";

export default function Header({ 
  breadcrumbs = <></>,
  sidebarOpen,
  setSidebarOpen
}: {
  breadcrumbs: React.ReactNode,
  sidebarOpen: boolean,
  setSidebarOpen: (open: boolean) => void
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { admin, setAdmin } = useAppContext();
  const t = useTranslations();
  const handleSettingsClick = () => {
    router.push('/dashboard/setting/profile')
  }

  const handleLogout = async () => {
    await logout();
    setAdmin({ username: '', avatar: null, email: '' });
    router.push('/login');
  }

  return (
    <header>
        <Card>
            <CardBody className="grid grid-cols-8 !py-3">
                <div className="col-span-6 content-center flex items-center gap-2">
                    <Button isIconOnly variant="light" size="sm" onPress={() => setSidebarOpen(!sidebarOpen)}><PanelLeft width={20} height={20} /></Button>
                    {breadcrumbs}
                </div>
                <div className="col-span-2 content-center justify-self-end">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                as="button"
                                className="transition-transform"
                                src={admin.avatar || ''}
                                name={admin.avatar ? undefined : admin.username?.charAt(0).toUpperCase()}
                                size="sm"
                                title={admin.username || ''}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">{t('core.logged_in_as')}</p>
                                <p className="font-semibold">{admin.username || ''}</p>
                            </DropdownItem>
                            <DropdownItem key="settings" onPress={handleSettingsClick}>
                                {t('core.settings')}
                            </DropdownItem>
                            <DropdownItem
                                key="logout"
                                color="danger"
                                isDisabled={isPending}
                                onPress={handleLogout}
                            >
                                {isPending ? t('core.logging_out') : t('core.logout')}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </CardBody>
        </Card>
    </header>
  )
}