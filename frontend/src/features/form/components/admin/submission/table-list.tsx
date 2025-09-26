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
import { PaginationParams } from "@/features/core/types/pagination-params";
import { Submission } from "@/features/form/types/submission/submission";
import { Dispatch, SetStateAction } from "react";
import { batchDelete } from "@/features/form/actions/admin/submission-action";
import { msg } from "@/features/core/utils/ui";
import { SearchParams } from "@/features/form/types/submission/search-params";

export default function TableList({loading, formId, data, setData, setParams, selectedKeys, setSelectedKeys,initialSearchParams}: {
    loading: boolean,
    formId: number,
    data: PaginationParams<Submission>, 
    setData: Dispatch<SetStateAction<PaginationParams<Submission>>>, 
    setParams: Dispatch<SetStateAction<SearchParams>>,
    selectedKeys: Selection, 
    setSelectedKeys: Dispatch<SetStateAction<Selection>>,
    initialSearchParams: SearchParams
}) {

    const columns = [{
        key: "id", label: "ID",
    }, {
        key: "created_at", label: "创建时间",
    }, {
        key: "ipv4", label: "IP"
    }, {
        key: "version", label: "表单版本"
    }, {
        key: "actions", label: "操作"
    }];

    const [mounted, setMounted] = useState(false);


    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="flex justify-center items-center h-full">Loading...</div>;
    }

    const handleDelete = async (id: number) => {
        if (confirm('确定删除吗？')) {
            const res = await batchDelete(formId, [id]);
            if (res.code === 0) {
                msg("删除成功", "删除成功", 'success');
                window.location.reload();
            } else {
                msg("删除失败", res.msg, 'warning');
            }
        } else {
            return ;
        }
    }

    // judge here
    if (loading) {
        return <div className="flex justify-center items-center h-full"></div>;
    } else {
        if (data.data.length === 0) {
            return <div className="flex justify-center items-center h-full">暂无数据</div>;
        }
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
                                                onPress={() => handleDelete(item.id)}
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