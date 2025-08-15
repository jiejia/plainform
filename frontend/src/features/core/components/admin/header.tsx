'use client'

import Block from "@/features/core/components/shared/block";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Card, CardHeader, CardBody, CardFooter} from "@heroui/react"
import { useEffect, useState, useTransition } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function Header({ 
  breadcrumbs = <></>
}: {
  breadcrumbs: React.ReactNode
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSettingsClick = () => {
    router.push('/dashboard/setting/profile')
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
                                src="https://i.pravatar.cc/150?u=default"
                                size="sm"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">已登录为</p>
                                <p className="font-semibold"></p>
                            </DropdownItem>
                            <DropdownItem key="settings" onPress={handleSettingsClick}>
                                设置
                            </DropdownItem>
                            <DropdownItem
                                key="logout"
                                color="danger"
                                isDisabled={isPending}
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