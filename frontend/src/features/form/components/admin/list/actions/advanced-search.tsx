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
import { parseDate, CalendarDate } from "@internationalized/date";
import { Search, ListFilterPlus, Hash, Activity } from "lucide-react";
import { SearchParams } from "@/features/form/types/list/search-params";
import { useState } from "react";
import { initialSearchParams } from "@/features/form/data/initial-search-params";
import { useTranslations } from 'next-intl';

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
    const t = useTranslations('form');

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

    const handleDateRangeChange = (value: { start: CalendarDate; end: CalendarDate } | null) => {
        if (value && value.start && value.end) {
            setInnerParams({
                ...innerParams,
                createdAtStart: value.start.toString(),
                createdAtEnd: value.end.toString()
            });
        } else {
            setInnerParams({
                ...innerParams,
                createdAtStart: '',
                createdAtEnd: ''
            });
        }
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

    const handleReset = () => {
        setInnerParams({ ...innerParams, keyword: '', createdAtStart: '', createdAtEnd: '', submissionsCountStart: null, submissionsCountEnd: null, status: null });
        setParams(initialSearchParams);
    }

    return (
        <FormModal title={t('advanced_search')}
            footer={(onClose) => (
                <>
                    <Button
                        size="sm"
                        color="default"
                        variant="flat"
                        onPress={() => { handleReset(); }}
                    >
                        {t('reset')}
                    </Button>
                    <Button
                        size="sm"
                        color="primary"
                        variant="solid"
                        onPress={() => { handleSearch(); onClose(); }}
                        isLoading={pending}
                        isDisabled={pending}
                    >
                        {pending ? t('searching') : t('search')}
                    </Button>
                </>

            )}
            button={
                <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    title={t('advanced_search')}
                >
                    <ListFilterPlus size="16" />
                </Button>
            }>
            <div className="flex flex-col gap-4">
                <div>
                    <Input
                        label={t('form_name')}
                        placeholder={t('enter_form_name_keyword')}
                        startContent={<Search size="16" className="text-default-400" />}
                        labelPlacement="outside"
                        value={innerParams.keyword}
                        onChange={handleKeywordsChange}
                    />
                </div>

                {/* 创建时间范围搜索 */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground">{t('create_time')}</label>
                    <div className="grid w-full">
                        <DateRangePicker
                            labelPlacement="outside"
                            value={(() => {
                                try {
                                    if (innerParams.createdAtStart && innerParams.createdAtEnd) {
                                        const startDate = innerParams.createdAtStart.includes(' ')
                                            ? innerParams.createdAtStart.split(' ')[0]
                                            : innerParams.createdAtStart;
                                        const endDate = innerParams.createdAtEnd.includes(' ')
                                            ? innerParams.createdAtEnd.split(' ')[0]
                                            : innerParams.createdAtEnd;
                                        return {
                                            start: parseDate(startDate),
                                            end: parseDate(endDate)
                                        };
                                    }
                                } catch (error) {
                                    console.warn('Failed to parse date range:', error);
                                }
                                return null;
                            })()}
                            onChange={handleDateRangeChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground">{t('submission_count')}</label>
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
                    <label className="text-sm font-medium text-foreground">{t('status')}</label>
                    <Select
                        placeholder={t('select_status')}
                        startContent={<Activity size="16" className="text-default-400" />}
                        labelPlacement="outside"
                        selectionMode="single"
                        selectedKeys={new Set([innerParams.status === null ? 'all' : innerParams.status.toString()])}
                        onSelectionChange={handleStatusChange}
                        defaultSelectedKeys={new Set(['all'])}
                    >
                        <SelectItem key="all">
                            {t('all')}
                        </SelectItem>
                        <SelectItem key="1">
                            {t('enabled')}
                        </SelectItem>
                        <SelectItem key="0">
                            {t('disabled')}
                        </SelectItem>
                    </Select>
                </div>
            </div>
        </FormModal>
    );
}