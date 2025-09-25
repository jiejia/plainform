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
} from "lucide-react";
import { SearchParams } from "@/features/form/types/submission/search-params";
import { Submission } from "@/features/form/types/submission/submission";
import { PaginationParams } from "@/features/core/types/pagination-params";
import { Select, SelectItem } from "@heroui/react";
import { initialSearchParams } from "@/features/form/data/submission/initial-search-params";
import { msg } from "@/features/core/utils/ui";
import { batchDelete } from "@/features/form/actions/admin/submission-action";

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

    // 定义搜索字段配置
    const searchFields: SearchField[] = [
        { key: 'id', label: 'ID', type: 'number' },
        { key: 'name', label: '名称', type: 'string' },
        { key: 'created_at', label: '创建时间', type: 'dateRange' },
        { key: 'submission_count', label: '提交数', type: 'number' },
        {
            key: 'status',
            label: '状态',
            type: 'select',
            options: [
                { key: 'active', label: '激活' },
                { key: 'inactive', label: '暂停' },
                { key: 'draft', label: '草稿' }
            ]
        }
    ];


    const sortOptions = [
        { key: "id_desc", orderBy: "id", orderType: "desc", text: "按ID/创建时间倒序" },
        { key: "id_asc", orderBy: "id", orderType: "asc", text: "按ID/创建时间顺序" },
        { key: "ipv4_desc", orderBy: "ipv4", orderType: "desc", text: "按IP倒序" },
        { key: "ipv4_asc", orderBy: "ipv4", orderType: "asc", text: "按IP顺序" },
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
            msg("删除失败", "请至少选择一个表单", 'warning');
            return;
        }
        // confirm
        const isConfirmed = await confirm('确定删除吗？');
        if (!isConfirmed) {
            return; 
        }
        // update remote data
        const res = await batchDelete(formId, ids);
        if (res.code === 0) {
            msg("删除成功", "删除成功", 'success');
            window.location.reload();
        } else {
            msg("删除失败", res.msg, 'warning');
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
                        placeholder="搜索..."
                        startContent={<Search size="16" />}
                    />
                    <Select
                        className=""
                        size="sm"
                        placeholder="选择版本"
                        selectedKeys={params.version ? [params.version.toString()] : versions.length > 0 ? [versions[versions.length - 1].toString()] : []}
                        onSelectionChange={(keys) => {
                            setParams({...params, version: parseInt(Array.from(keys)[0] as string)});
                        }}
                    >
                        {versions.map((version) => (
                            <SelectItem key={version.toString()} textValue={"版本" +  version.toString()}>版本{version}</SelectItem>
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
                <FormModal title="高级搜索" footer={null} button={
                    <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        title="advanced search"
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
                            批量删除
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    </>;
}