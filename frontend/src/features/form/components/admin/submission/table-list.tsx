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
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
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
import { useTranslations } from "next-intl";

export default function TableList({ loading, formId, data, setData, setParams, selectedKeys, setSelectedKeys, initialSearchParams }: {
    loading: boolean,
    formId: number,
    data: PaginationParams<Submission>,
    setData: Dispatch<SetStateAction<PaginationParams<Submission>>>,
    setParams: Dispatch<SetStateAction<SearchParams>>,
    selectedKeys: Selection,
    setSelectedKeys: Dispatch<SetStateAction<Selection>>,
    initialSearchParams: SearchParams
}) {

    const t = useTranslations();

    const columns = [{
        key: "id", label: "ID",
    }, {
        key: "created_at", label: t('form.created_at'),
    }, {
        key: "ipv4", label: t('form.ip')
    }, {
        key: "version", label: t('form.form_version')
    }, {
        key: "actions", label: t('form.actions')
    }];

    const [mounted, setMounted] = useState(false);
    const [currentItem, setCurrentItem] = useState<Submission | null>(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();


    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="flex justify-center items-center h-full">Loading...</div>;
    }

    const handleDelete = async (id: number) => {
        if (confirm(t('form.confirm_delete_message'))) {
            const res = await batchDelete(formId, [id]);
            if (res.code === 0) {
                msg(t('form.delete_success_message'), t('form.delete_success_message'), 'success');
                window.location.reload();
            } else {
                msg(t('form.delete_failed_message'), t(res.msg), 'warning');
            }
        } else {
            return;
        }
    }

    const handleView = (item: Submission) => {
        setCurrentItem(item);
        onOpen();
    }

    // judge here
    if (loading) {
        return <div className="flex justify-center items-center h-full"></div>;
    } else {
        if (data.data.length === 0) {
            return <div className="flex justify-center items-center h-full">{t('form.no_data')}</div>;
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
                                                onPress={() => handleView(item)}
                                            >
                                                {t('form.view_action')}
                                            </DropdownItem>
                                            <DropdownItem
                                                key="delete"
                                                className="text-danger"
                                                color="danger"
                                                startContent={<Trash2 size="16" />}
                                                onPress={() => handleDelete(item.id)}
                                            >
                                                {t('form.delete')}
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
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{t('form.submission_details')}</ModalHeader>
              <ModalBody>
              {currentItem && (() => {
                                // 格式化字段值的函数
                                const formatValue = (value: any): string => {
                                    if (value === null || value === undefined) {
                                        return '';
                                    }
                                    
                                    // 处理数组类型 - 转换为逗号分隔的字符串
                                    if (Array.isArray(value)) {
                                        return value.join(', ');
                                    }
                                    
                                    // 处理布尔类型 - 转换为是/否
                                    if (typeof value === 'boolean') {
                                        return value ? t('form.yes') : t('form.no');
                                    }
                                    
                                    // 处理其他对象类型
                                    if (typeof value === 'object') {
                                        return JSON.stringify(value);
                                    }
                                    
                                    // 其他类型直接转字符串
                                    return String(value);
                                };

                                // 准备表单数据字段
                                const formDataRows: any[] = [];
                                if (currentItem.data && Array.isArray(currentItem.data)) {
                                    currentItem.data.forEach((field: any, index: number) => {
                                        formDataRows.push({
                                            key: `field_${field.uuid || index}`,
                                            name: field.name,
                                            value: formatValue(field.value)
                                        });
                                    });
                                }

                                return (
                                    <div className="space-y-6">
                                        {/* 系统信息区域 */}
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-sm font-medium text-gray-500">ID</label>
                                                    <p className="mt-1 text-sm text-gray-900">{currentItem.id}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-500">{t('form.form_version')}</label>
                                                    <p className="mt-1 text-sm text-gray-900">{currentItem.version}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-500">{t('form.ip_address')}</label>
                                                    <p className="mt-1 text-sm text-gray-900">{currentItem.ipv4}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-500">{t('form.created_at')}</label>
                                                    <p className="mt-1 text-sm text-gray-900">{currentItem.created_at || t('form.unknown')}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 表单数据表格 */}
                                        {formDataRows.length > 0 ? (
                                            <div>
                                                <Table removeWrapper>
                                                    <TableHeader>
                                                        <TableColumn>{t('form.field_name')}</TableColumn>
                                                        <TableColumn>{t('form.field_value')}</TableColumn>
                                                    </TableHeader>
                                                    <TableBody items={formDataRows}>
                                                        {(row) => (
                                                            <TableRow key={row.key}>
                                                                <TableCell>{row.name}</TableCell>
                                                                <TableCell>{row.value}</TableCell>
                                                            </TableRow>
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="text-center py-8 bg-gray-50 rounded-lg">
                                                    <p className="text-sm text-gray-500">{t('form.no_form_data')}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {t('form.close')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>;
}