'use client';

import React, { Dispatch, SetStateAction } from "react";
import {
    Button,
    Input,
    SharedSelection,
    Selection,
    useDisclosure,
} from "@heroui/react";
import {
    Search,
    RefreshCw,
} from "lucide-react";
import FormModal from "@/features/core/components/admin/form-modal";
import AdvancedSearch from "./advanced-search";
import { SearchField, SearchCondition } from "./advanced-search";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/react";
import {
    EllipsisVertical,
    ListFilterPlus,
    ArrowDownUp,
    Pause,
    Play,
    Trash2,
    Download,
} from "lucide-react";
import { SearchParams } from "@/features/form/types/submission/search-params";
import { Submission } from "@/features/form/types/submission/submission";
import { PaginationParams } from "@/features/core/types/pagination-params";
import { Select, SelectItem } from "@heroui/react";
import { msg } from "@/features/core/utils/ui";
import { batchDelete, exportExcel } from "@/features/form/actions/admin/submission-action";
import { useTranslations } from "next-intl";

export default function Actions({ formId, params, setParams, tableSelectedKeys, currentPageIds, data, setData, versions, initialSearchParams }: {
    formId: number,
    params: SearchParams,
    setParams: (params: SearchParams) => void,
    tableSelectedKeys: Selection,
    currentPageIds: number[],
    data: PaginationParams<Submission>,
    setData: Dispatch<SetStateAction<PaginationParams<Submission>>>,
    versions: number[],
    initialSearchParams: SearchParams
}) {

    const t = useTranslations();

    // 定义搜索字段配置
    const searchFields: SearchField[] = [
        { key: 'id', label: 'ID', type: 'number' },
        { key: 'name', label: t('form.name'), type: 'string' },
        { key: 'created_at', label: t('form.created_at'), type: 'dateRange' },
        { key: 'submission_count', label: t('form.submission_count'), type: 'number' },
        {
            key: 'status',
            label: t('form.status'),
            type: 'select',
            options: [
                { key: 'active', label: t('form.enabled') },
                { key: 'inactive', label: t('form.disabled') },
                { key: 'draft', label: t('form.disabled') }
            ]
        }
    ];


    const sortOptions = [
        { key: "id_desc", orderBy: "id", orderType: "desc", text: t('form.sort_id_desc') },
        { key: "id_asc", orderBy: "id", orderType: "asc", text: t('form.sort_id_asc') },
        { key: "ipv4_desc", orderBy: "ipv4", orderType: "desc", text: t('form.sort_by_ip_desc') },
        { key: "ipv4_asc", orderBy: "ipv4", orderType: "asc", text: t('form.sort_by_ip_asc') },
    ];

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [selectedKeys2, setSelectedKeys2] = React.useState<SharedSelection>(new Set(["text"]));


    const selectedValue = React.useMemo(() => Array.from(selectedKeys2).join(", ").replace(/_/g, ""), [selectedKeys2],);

    // 高级搜索处理函数
    const handleAdvancedSearch = (conditions: SearchCondition[]) => {
        console.log('搜索条件:', conditions);
        // 在这里处理搜索逻辑
        // 例如：调用API，更新表格数据等
    };

    const handleSearchReset = () => {
        console.log('重置搜索');
        // 在这里处理重置逻辑
        // 例如：清空搜索条件，重新加载数据等
    };

    const handleSortChange = (e: SharedSelection) => {
        const selectedKey = e.currentKey;
        const selectedOption = sortOptions.find(option => option.key === selectedKey);
        if (selectedOption) {
            setParams({...params, orderBy: selectedOption.orderBy, orderType: selectedOption.orderType});
        }
        setSelectedKeys2(e);
    }

    const handleRefresh = () => {
        setParams(initialSearchParams);
    }

    const handleBatchDelete = async () => {
        // get ids
        const ids = getIds();

        console.log('ids', ids);
        if (ids.length === 0) {
            msg(t('form.delete_failed_message'), t('form.at_least_select_one_message'), 'warning');
            return;
        }
        // confirm
        const isConfirmed = await confirm(t('form.confirm_delete_message'));
        if (!isConfirmed) {
            return; 
        }
        // update remote data
        const res = await batchDelete(formId, ids);
        if (res.code === 0) {
            msg(t('form.delete_success_message'), t('form.delete_success_message'), 'success');
            window.location.reload();
        } else {
            msg(t('form.delete_failed_message'), t(res.msg), 'warning');
        }
    }

    const handleExportExcel = async () => {
        console.log('params', params);
        const res = await exportExcel(formId, params);
        if (res.code === 0 && res.data) {
            // Convert ArrayBuffer to Blob
            const blob = new Blob([res.data], { 
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
            });
            
            // Create download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `submissions_${Date.now()}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            // msg("导出成功", "Excel文件已开始下载", 'success');
        } else {
            msg(t('form.export_failed_message'), t(res.msg), 'warning');
        }
    }

    const getIds = () => {
        return tableSelectedKeys === "all"
          ? currentPageIds
          : Array.from(tableSelectedKeys as Set<React.Key>).map(Number);
    }

    return <>

        <div className="grid grid-cols-[1fr_auto] items-center gap-2">
            <div>
                <form className="grid grid-cols-[1fr_100px] gap-2 w-full">
                    <Input
                        label=""
                        type="text"
                        size="sm"
                        placeholder={t('form.search_placeholder')}
                        startContent={<Search size="16" />}
                    />
                    <Select
                        className=""
                        size="sm"
                        placeholder={t('form.select_version')}
                        selectedKeys={params.version ? [params.version.toString()] : versions.length > 0 ? [versions[versions.length - 1].toString()] : []}
                        onSelectionChange={(keys) => {
                            const first = Array.from(keys)[0] as string | undefined;
                            if (!first) return;
                            const next = Number(first);
                            if (Number.isNaN(next)) return;
                            setParams({ ...params, page: 1, version: next });
                        }}
                    >
                        {versions.map((version) => (
                            <SelectItem key={version.toString()} textValue={t('form.version_prefix') +  version.toString()}>{t('form.version_prefix')}{version}</SelectItem>
                        ))}
                    </Select>
                </form>
            </div>
            <div className="grid grid-flow-col gap-2">
                <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    title="refresh"
                    onPress={handleRefresh}
                >
                    <RefreshCw size="16" />
                </Button>
                <FormModal title={t('form.advanced_search')} footer={null} button={
                    <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        title={t('form.advanced_search')}
                        onPress={onOpen}
                    >
                        <ListFilterPlus size="16" />
                    </Button>
                }>
                    <AdvancedSearch
                        fields={searchFields}
                        onSearch={handleAdvancedSearch}
                        onReset={handleSearchReset}
                    />
                </FormModal>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Button isIconOnly className="capitalize" variant="flat" size="sm">
                            <ArrowDownUp size="16" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        aria-label="Single selection example"
                        selectedKeys={selectedKeys2}
                        selectionMode="single"
                        variant="flat"
                        onSelectionChange={handleSortChange}
                    >
                        {sortOptions.map((option) => (
                            <DropdownItem
                                key={option.key}
                                textValue={option.text}
                            >
                                {option.text}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Button isIconOnly className="capitalize" variant="flat" size="sm">
                            <EllipsisVertical size="16" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="delete" className="text-danger" color="danger" startContent={<Trash2 size="16" />} onPress={handleBatchDelete}>
                            {t('form.batch_delete_action')}
                        </DropdownItem>
                        <DropdownItem key="export" className="text-primary" color="primary" startContent={<Download size="16" />} onPress={handleExportExcel}>
                            {t('form.export_excel')}
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    </>;
}