'use client';

import React from "react";
import Scroll from "@/features/core/components/shared/scroll";
import {
    Card,
    CardBody,
    Select,
    SelectItem,
    Selection,
    SharedSelection,
} from "@heroui/react";

import Actions from "./actions";
import TableList from "./table-list";
import Pagenate from "./pagenate";
import { useState, useEffect } from "react";
import { SearchParams } from "@/features/form/types/list/search-params";
import { list } from "@/features/form/actions/form-action";
import { msg } from "@/features/core/utils/ui";
import { PaginationParams } from "@/features/core/types/pagination-params";
import { Form as FormInList } from "@/features/form/types/list/form";
import { initialSearchParams } from "@/features/form/data/initial-search-params";

export default function Index() {

    const [params, setParams] = useState<SearchParams>(initialSearchParams);

    const [data, setData] = useState<PaginationParams<FormInList>>({
        current_page: 1,
        data: [],
        first_page_url: '',
        last_page: 1,
        last_page_url: '',
        from: 1,
        links: [],
        next_page_url: '',
        path: '',
        per_page: 10,
        prev_page_url: '',
        to: 1,
        total: 1,
    });

    const fetchList = async () => {
        try {
            const res = await list(params);
            setData(res.data as PaginationParams<FormInList>);   
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {   
        fetchList();
    }, [params]);

    return (
        <div className="grid grid-rows-[56px_1fr_56px] gap-4 h-full">
            <Card className="h-full">
                <CardBody className="pt-3">
                    <Actions params={params} setParams={setParams}/>
                </CardBody>
            </Card>
            <Card className="h-full">
                <CardBody className="h-full">
                    <Scroll>
                        <TableList list={data.data}/>
                    </Scroll>
                </CardBody>
            </Card>
            <Card>
                <CardBody className="grid sm:grid-cols-[80px_1fr_80px] grid-cols-[1fr] pt-3 gap-2">
                    <Pagenate data={data} params={params} setParams={setParams}/>
                </CardBody>
            </Card>
        </div>
    );
}