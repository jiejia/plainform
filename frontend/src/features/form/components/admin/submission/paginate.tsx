'use client';

import React from "react";
import {
    Pagination,
    Select,
    SelectItem,
} from "@heroui/react";
import { SearchParams } from "@/features/form/types/submission/search-params";
import { PaginationParams } from "@/features/core/types/pagination-params";
import { Submission } from "@/features/form/types/submission/submission";

export default function Paginate({data, params, setParams}: {
    data: PaginationParams<Submission>, 
    params: SearchParams, 
    setParams: (params: SearchParams) => void
}) {
    // console.log('data', data);

    const handleLimitChange = (limit: number | null) => {
        if (!limit) {
            return;
        }
        setParams({...params, limit: limit});
    }

    const handlePageChange = (page: number) => {
        setParams({...params, page: page});
    }

    return <>
        <div className="hidden sm:block justify-items-center content-center">
            Total {data.total}
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
                {[20, 30, 50, 100].map((size) => (<SelectItem key={size.toString()} textValue={size.toString()}>
                    {size}
                </SelectItem>))}
            </Select>
        </div>
    </>;
}