'use client'

import React from "react";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Selection,
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

export default function TableList() {

    const rows = [{
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 100,
        status: "active",
        action: "edit",
    }, {
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 50032,
        status: "active",
        action: "edit",
    }, {
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    }, {
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    }, {
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    }, {
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    }, {
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    }, {
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    }, {
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    }, {
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    }, {
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    }, {
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    }, {
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    }, {
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    }, {
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    }, {
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

    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["2"]));

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
                                ) : columnKey === "submission_count" ? (
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
                                ) : (
                                    getKeyValue(item, columnKey)
                                )}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>);
}