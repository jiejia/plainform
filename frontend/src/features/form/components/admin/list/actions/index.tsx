'use client'

import React from "react";
import {
    Button,
    Input,
    SharedSelection,
    Selection
} from "@heroui/react";
import {
    EllipsisVertical,
    ArrowDownUp,
    Pause,
    Play,
    Trash2,
    Search,
    RefreshCw,
} from "lucide-react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Link,
} from "@heroui/react";
import { SearchParams } from "@/features/form/types/list/search-params";
import AdvancedSearch from "./advanced-search";
import { initialSearchParams } from "@/features/form/data/initial-search-params";
import { batchDelete, batchUpdateEnabled } from "@/features/form/actions/admin/form-action";
import { PaginationParams } from "@/features/core/types/pagination-params";
import { Form as FormInList } from "@/features/form/types/list/form";
import { Dispatch, SetStateAction } from "react";
import { msg } from "@/features/core/utils/ui";

export default function Actions({params, setParams, tableSelectedKeys, currentPageIds, data, setData}: {
    params: SearchParams, 
    setParams: (params: SearchParams) => void, 
    tableSelectedKeys: Selection, 
    currentPageIds: number[], 
    data: PaginationParams<FormInList>, 
    setData: Dispatch<SetStateAction<PaginationParams<FormInList>>>
}) {

    const sortOptions = [
        { key: "id_desc", orderBy: "id", orderType: "desc", text: "按ID/创建时间倒序" },
        { key: "id_asc", orderBy: "id", orderType: "asc", text: "按ID/创建时间顺序" },
        { key: "title_desc", orderBy: "title", orderType: "desc", text: "按名称倒序" },
        { key: "title_asc", orderBy: "title", orderType: "asc", text: "按名称顺序" },
        { key: "submissions_desc", orderBy: "submissions_count", orderType: "desc", text: "按提交数倒序" },
        { key: "submissions_asc", orderBy: "submissions_count", orderType: "asc", text: "按提交数顺序" },
        // { key: "enabled_desc", orderBy: "enabled", orderType: "desc", text: "按状态倒序" },
        // { key: "enabled_asc", orderBy: "enabled", orderType: "asc", text: "按状态顺序" },
    ];

    const [selectedKeys, setSelectedKeys] = React.useState<SharedSelection>(new Set(["id_desc"]));


    const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParams({...params, keyword: e.target.value});
    }

    const handleSortChange = (e: SharedSelection) => {
        const selectedKey = e.currentKey;
        const selectedOption = sortOptions.find(option => option.key === selectedKey);
        if (selectedOption) {
            setParams({...params, orderBy: selectedOption.orderBy, orderType: selectedOption.orderType});
        }
        setSelectedKeys(e);
    }

    const handleRefresh = () => {
        setParams(initialSearchParams);
    }

    const getIds = () => {
        return tableSelectedKeys === "all"
          ? currentPageIds
          : Array.from(tableSelectedKeys as Set<React.Key>).map(Number);
    }


    const handleBatchUpdateEnabledDisable = async () => {
        // get ids
        const ids = getIds();
        if (ids.length === 0) {
            msg("关闭失败", "请至少选择一个表单", 'warning');
            return;
        }
        
        // construct items
        const items = ids.map(id => ({ id, enabled: false }));
        
        // update remote data
        await batchUpdateEnabled(items);

        // update local data
        setData(prev => ({
            ...prev,
            data: prev.data.map(item =>
                ids.includes(item.id) ? { ...item, enabled: false } : item
            ),
        }));
        
        // update local data
        setData(prev => ({
            ...prev,
            data: prev.data.map(item =>
                ids.includes(item.id) ? { ...item, enabled: false } : item
            ),
        }));
    }

    const handleBatchUpdateEnabledActive = async () => {
        // get ids
        const ids = getIds();
        if (ids.length === 0) {
            msg("启用失败", "请至少选择一个表单", 'warning');
            return;
        }
        
        // construct items
        const items = ids.map(id => ({ id, enabled: true }));
        
        // update remote data
        await batchUpdateEnabled(items);

        // update local data
        setData(prev => ({
            ...prev,
            data: prev.data.map(item =>
                ids.includes(item.id) ? { ...item, enabled: true } : item
            ),
        }));
    }

    const handleBatchDelete = async () => {
        // get ids
        const ids = getIds();
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
        const res = await batchDelete(ids);
        if (res.code === 0) {
            // update local data
            setData(prev => ({
                ...prev,
                data: prev.data.filter(item => !ids.includes(item.id)),
            }));
        } else {
            msg("删除失败", res.msg, 'warning');
        }
    }   
    
    return (
        <>
            <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                <div>
                    <form>
                        <Input
                            label=""
                            type="text"
                            size="sm"
                            placeholder="搜索表单..."
                            startContent={<Search size="16" />}
                            value={params.keyword}
                            onChange={handleKeywordsChange}
                        />
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
                    <AdvancedSearch params={params} setParams={setParams} />
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Button isIconOnly className="capitalize" variant="flat" size="sm">
                                <ArrowDownUp size="16" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Single selection example"
                            selectedKeys={selectedKeys}
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
                            <DropdownItem key="pause" startContent={<Pause size="16" />} onPress={handleBatchUpdateEnabledDisable}>批量关闭</DropdownItem>
                            <DropdownItem key="reactive" startContent={<Play size="16" />} onPress={handleBatchUpdateEnabledActive}>批量启用</DropdownItem>
                            <DropdownItem key="delete" className="text-danger" color="danger" startContent={<Trash2 size="16" />} onPress={handleBatchDelete}>
                                批量删除
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Button
                        size="sm"
                        title="order by"
                        color="primary"
                        variant="flat"
                        as={Link}
                        href="/dashboard/form/create"
                    >
                        Create
                    </Button>
                </div>
            </div>
        </>
    );
}