'use client';

import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue
} from "@heroui/table";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Selection,
    Button,
} from "@heroui/react";
import {
    EllipsisVertical,
    Pencil,
    Eye,
    Trash2,
} from "lucide-react";
export default function TableList() {
    const rows = [{
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    }];

    const columns = [{
        key: "id", label: "ID",
    }, {
        key: "name", label: "名称",
    }, {
        key: "created_at", label: "创建时间",
    }, {
        key: "submission_count", label: "提交数"
    }, {
        key: "status", label: "状态"
    }, {
        key: "actions", label: "操作"
    }];

    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["1"]));
    const [mounted, setMounted] = useState(false);

    
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div>Loading...</div>;
    }


    return <>

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
            <TableBody items={rows}>
                {(item) => (
                    <TableRow key={item.key}>
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
                                ) : (
                                    getKeyValue(item, columnKey)
                                )}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </>;
}