'use client';

import React from "react";
import FormModal from "@/features/core/components/admin/form-modal";
import {
    Button,
    Input,
    Select,
    SelectItem,
    DateRangePicker,
    SharedSelection,
} from "@heroui/react";
import { parseDateTime } from "@internationalized/date";
import { Search, ListFilterPlus, Hash, Activity } from "lucide-react";
import { SearchParams } from "@/features/form/types/list/search-params";
import { useState } from "react";

type AdvancedSearchProps = {
    keyword: string;
    createdAtStart: string;
    createdAtEnd: string;
    submissionsCountStart: number | null;
    submissionsCountEnd: number | null;
    status: number | null;
}

export default function AdvancedSearch({ params, setParams }: { params: SearchParams, setParams: (params: SearchParams) => void }) {
    const [pending, setPending] = useState(false);

    const [innerParams, setInnerParams] = useState<AdvancedSearchProps>({
        keyword: params.keyword,
        createdAtStart: params.createdAtStart,
        createdAtEnd: params.createdAtEnd,
        submissionsCountStart: params.submissionsCountStart,
        submissionsCountEnd: params.submissionsCountEnd,
        status: params.status,
    });

    const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInnerParams({ ...innerParams, keyword: e.target.value });
    }

    const handleCreatedAtStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInnerParams({ ...innerParams, createdAtStart: e.target.value });
    }

    const handleCreatedAtEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInnerParams({ ...innerParams, createdAtEnd: e.target.value });
    }

    const handleSubmissionsCountStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInnerParams({ ...innerParams, submissionsCountStart: parseInt(e.target.value) });
    }

    const handleSubmissionsCountEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInnerParams({ ...innerParams, submissionsCountEnd: parseInt(e.target.value) });
    }

    const handleStatusChange = (e: SharedSelection) => {
        const selectedKey = Array.from(e)[0]?.toString();
        const statusValue = selectedKey === 'all' ? null : parseInt(selectedKey);
        setInnerParams({ ...innerParams, status: statusValue });
    }

    const handleSearch = () => {
        setPending(true);
        setParams({ ...params, ...innerParams });
        setPending(false);
    }

    return (
        <FormModal title="高级搜索"
            footer={(onClose) => (
                <Button
                    size="sm"
                    color="primary"
                    variant="solid"
                    onPress={() => { handleSearch(); onClose(); }}
                    isLoading={pending}
                    isDisabled={pending}
                >
                    {pending ? '搜索中...' : '搜索'}
                </Button>
            )}
            button={
                <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    title="advanced search"
                >
                    <ListFilterPlus size="16" />
                </Button>
            }>
            <div className="flex flex-col gap-4">
                <div>
                    <Input
                        label="表单名称"
                        placeholder="输入表单名称关键词..."
                        startContent={<Search size="16" className="text-default-400" />}
                        labelPlacement="outside"
                        value={innerParams.keyword}
                        onChange={handleKeywordsChange}
                    />
                </div>

                {/* 创建时间范围搜索 */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground">创建时间</label>
                    <div className="grid w-full">
                        <DateRangePicker
                            labelPlacement="outside"
                            defaultValue={{
                                start: parseDateTime("2025-08-13T14:00:00"),
                                end: parseDateTime("2025-08-13T18:00:00"),
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground">提交数量</label>
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            type="number"
                            placeholder="0"
                            startContent={<Hash size="16" className="text-default-400" />}
                            labelPlacement="outside"
                            min="0"
                            value={innerParams.submissionsCountStart?.toString() || ''}
                            onChange={handleSubmissionsCountStartChange}
                        />
                        <Input
                            type="number"
                            placeholder="999"
                            startContent={<Hash size="16" className="text-default-400" />}
                            labelPlacement="outside"
                            min="0"
                            value={innerParams.submissionsCountEnd?.toString() || ''}
                            onChange={handleSubmissionsCountEndChange}
                        />
                    </div>
                </div>

                {/* 状态搜索 */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground">状态</label>
                    <Select
                        placeholder="选择状态"
                        startContent={<Activity size="16" className="text-default-400" />}
                        labelPlacement="outside"
                        selectionMode="single"
                        selectedKeys={new Set([innerParams.status === null ? 'all' : innerParams.status.toString()])}
                        onSelectionChange={handleStatusChange}
                        defaultSelectedKeys={new Set(['all'])}
                    >
                        <SelectItem key="all">
                            全部
                        </SelectItem>
                        <SelectItem key="1">
                            启用
                        </SelectItem>
                        <SelectItem key="0">
                            禁用
                        </SelectItem>
                    </Select>
                </div>
            </div>
        </FormModal>
    );
}