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
import { batchUpdateEnabled } from "@/features/form/actions/admin/form-action";
import { PaginationParams } from "@/features/core/types/pagination-params";

export default function TableList({ data, setData }: { data: PaginationParams<FormInList>, setData: (data: PaginationParams<FormInList>) => void }) {
    const [mounted, setMounted] = useState(false);

    const columns = [{
        key: "id", label: "ID",
    }, {
        key: "title", label: "名称",
    }, {
        key: "created_at", label: "创建时间",
    }, {
        key: "submissions_count", label: "提交数"
    }, {
        key: "enabled", label: "启用状态",
    }, {
        key: "actions", label: "操作"
    }];

    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));


    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div>Loading...</div>;
    }

    const handleEnabledChange = (e: any, id: number) => {
        console.log(e.target.checked, id);
        batchUpdateEnabled([{ id: id, enabled: e.target.checked }]).then(() => {
            setData({ ...data, data: data.data.map(item => item.id === id ? { ...item, enabled: e.target.checked } : item) });
        });
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
                                                编辑
                                            </DropdownItem>
                                            <DropdownItem
                                                key="view"
                                                startContent={<Eye size="16" />}
                                                href={`/dashboard/form/${item.id}`}
                                            >
                                                查看
                                            </DropdownItem>
                                            <DropdownItem
                                                key="delete"
                                                className="text-danger"
                                                color="danger"
                                                startContent={<Trash2 size="16" />}
                                            >
                                                删除
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
                                        checked={item.enabled as boolean}
                                        aria-label="Automatic updates"
                                        size="sm"
                                        onChange={(checked) => handleEnabledChange(checked, item.id)}
                                    />

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