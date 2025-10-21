'use client'

import React, { useEffect } from "react";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Selection,
    Switch,
} from "@heroui/react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@heroui/table";
import { getKeyValue } from "@heroui/table";
import { EllipsisVertical, Pencil, Eye, Trash2 } from "lucide-react";
import { Link } from "@heroui/react";
import { useState } from "react";
import { Form as FormInList } from "@/features/form/types/list/form";
import { batchDelete, batchUpdateEnabled } from "@/features/form/actions/admin/form-action";
import { PaginationParams } from "@/features/core/types/pagination-params";
import { Dispatch, SetStateAction } from "react";
import { msg } from "@/features/core/utils/ui";
import { useTranslations } from 'next-intl';


export default function TableList({ loading, data, setData, selectedKeys, setSelectedKeys }: {
    loading: boolean,
    data: PaginationParams<FormInList>,
    setData: Dispatch<SetStateAction<PaginationParams<FormInList>>>,
    selectedKeys: Selection,
    setSelectedKeys: Dispatch<SetStateAction<Selection>>
}) {
    const [mounted, setMounted] = useState(false);
    const t = useTranslations('form');

    const columns = [{
        key: "id", label: t('id'),
    }, {
        key: "title", label: t('title'),
    }, {
        key: "created_at", label: t('created_at'),
    }, {
        key: "submissions_count", label: t('submissions_count')
    }, {
        key: "enabled", label: t('enabled_status'),
    }, {
        key: "actions", label: t('actions')
    }];


    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="flex justify-center items-center h-full">{t('loading')}</div>;
    }

    if (loading) {
        return <div className="flex justify-center items-center h-full"></div>;
    } else {
        if (data.data.length === 0) {
            return <div className="flex justify-center items-center h-full">{t('no_data')}</div>;
        }
    }

    const handleEnabledChange = async (checked: boolean, id: number) => {
        // update remote data
        await batchUpdateEnabled([{ id, enabled: checked }]);

        // update local data
        setData(prev => ({
            ...prev,
            data: prev.data.map(item =>
                item.id === id ? { ...item, enabled: checked } : item
            ),
        }));
    };

    const handleDelete = async (id: number) => {
        // confirm
        const isConfirmed = await confirm(t('confirm_delete'));
        if (!isConfirmed) {
            msg(t('delete_failed'), t('at_least_select_one'), 'warning');
            return;
        }

        // update remote data
        const res = await batchDelete([id]);
        if (res.code === 0) {
            // update local data
            setData(prev => ({
                ...prev,
                data: prev.data.filter(item => item.id !== id),
            }));
        } else {
            msg(t('delete_failed'), res.msg, 'warning');
        }
    }

    if (data.data.length === 0) {
        return <div className="flex justify-center items-center h-full">{t('no_data')}</div>;
    }

    return (
        <Table
            aria-label="Controlled table example with dynamic content"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            selectionMode="multiple"
            removeWrapper
        >
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={data.data}>
                {(item) => (
                    <TableRow key={item.id.toString()}>
                        {(columnKey) => (
                            <TableCell>
                                {columnKey === "actions" ? (
                                    <Dropdown placement="bottom-end">
                                        <DropdownTrigger>
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="light"
                                                className="text-default-400"
                                            >
                                                <EllipsisVertical size="16" />
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Row actions">
                                            <DropdownItem
                                                key="edit"
                                                startContent={<Pencil size="16" />}
                                                href={`/dashboard/form/${item.id}/edit`}
                                            >
                                                {t('edit')}
                                            </DropdownItem>
                                            <DropdownItem
                                                key="view"
                                                startContent={<Eye size="16" />}
                                                href={`/dashboard/form/${item.id}`}
                                            >
                                                {t('view')}
                                            </DropdownItem>
                                            <DropdownItem
                                                key="delete"
                                                className="text-danger"
                                                color="danger"
                                                startContent={<Trash2 size="16" />}
                                                onPress={() => handleDelete(item.id)}
                                            >
                                                {t('delete')}
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                ) : columnKey === "title" ? (
                                    <Link
                                        href={`/form/${item.uuid}`}
                                        target="_blank"

                                    >
                                        {getKeyValue(item, columnKey)}
                                    </Link>
                                ) : columnKey === "submissions_count" ? (
                                    <Button
                                        as={Link}
                                        href={`/dashboard/form/${item.id}/submission`}
                                        variant="flat"
                                        size="sm"
                                        color="primary"
                                        className="min-w-fit w-auto"
                                    >
                                        {getKeyValue(item, columnKey)}
                                    </Button>
                                ) : columnKey === "enabled" ? (
                                    <Switch

                                        isSelected={item.enabled as boolean}
                                        aria-label="Automatic updates"
                                        size="sm"
                                        onValueChange={(isSelected) => handleEnabledChange(isSelected, item.id)} />

                                ) : (
                                    getKeyValue(item, columnKey)
                                )}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}