'use client'

import React from "react";
import {
    Select,
    SelectItem,
    Pagination,
} from "@heroui/react";
import { PaginationParams } from "@/features/core/types/pagination-params";
import { Form as FormInList } from "@/features/form/types/list/form";
import { SearchParams } from "@/features/form/types/list/search-params";
import { useTranslations } from 'next-intl';

export default function Pagenate({data, params, setParams}: {data: PaginationParams<FormInList>, params: SearchParams, setParams: (params: SearchParams) => void}) {
    const t = useTranslations('form');

    /**
     * handle page change
     * @param page 
     */
    const handlePageChange = (page: number) => {
        setParams({...params, page: page});
    }


    /**
     * handle limit change
     * @param limit 
     */
    const handleLimitChange = (limit: number | null) => {
        if (!limit) {
            return;
        }
        setParams({...params, limit: limit});
    }
    return (
        <>
            <div className="hidden sm:block justify-items-center content-center">
                {t('total')} {data.total}
            </div>
            <div className="justify-items-center content-center">
                <Pagination
                    showControls
                    showShadow
                    color="primary"
                    page={data.current_page}
                    total={data.last_page}
                    size={"sm"}
                    initialPage={1}
                    onChange={(page) => handlePageChange(page)}
                />
            </div>
            <div className="hidden sm:block justify-items-center content-center">
                <Select
                    disallowEmptySelection
                    selectionMode="single"
                    className="max-w-xs"
                    size="sm"
                    selectedKeys={[params.limit.toString()]}
                    onSelectionChange={(keys) =>
                        handleLimitChange(parseInt(Array.from(keys)[0] as string))
                    }
                >
                    {[10, 20, 30, 50, 100].map((size) => (<SelectItem key={size} textValue={size.toString()}>
                        {size}
                    </SelectItem>))}
                </Select>
            </div>
        </>
    );
}