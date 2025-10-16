'use client'

import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Card, CardHeader, CardBody, CardFooter} from "@heroui/react"
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from "@/features/admin/actions/auth-action";
import { useAppContext } from "@/features/core/context/AppContext";
import ThemeToggle from "@/features/core/components/shared/theme-toggle";

export default function Header({ 
  breadcrumbs = <></>
}: {
  breadcrumbs: React.ReactNode
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { admin, setAdmin } = useAppContext();
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
                <div className="col-span-6 content-center">
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
                                <p className="font-semibold">已登录为</p>
                                <p className="font-semibold">{admin.username || ''}</p>
                            </DropdownItem>
                            <DropdownItem key="settings" onPress={handleSettingsClick}>
                                设置
                            </DropdownItem>
                            <DropdownItem
                                key="logout"
                                color="danger"
                                isDisabled={isPending}
                                onPress={handleLogout}
                            >
                                {isPending ? '退出中...' : '登出'}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </CardBody>
        </Card>
    </header>
  )
}