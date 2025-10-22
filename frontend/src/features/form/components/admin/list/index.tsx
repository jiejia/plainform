'use client';

import React from "react";
import Scroll from "@/features/core/components/shared/scroll";
import {
    Card,
    CardBody,
    Selection,
} from "@heroui/react";

import Actions from "./actions";
import TableList from "./table-list";
import Pagenate from "./pagenate";
import { useState, useEffect } from "react";
import { SearchParams } from "@/features/form/types/list/search-params";
import { list } from "@/features/form/actions/admin/form-action";
import { PaginationParams } from "@/features/core/types/pagination-params";
import { Form as FormInList } from "@/features/form/types/list/form";
import { initialSearchParams } from "@/features/form/data/initial-search-params";
import { initialPagination } from "@/features/form/data/initial-pagination";

export default function Index() {

    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));

    const [params, setParams] = useState<SearchParams>(initialSearchParams);

    const [data, setData] = useState<PaginationParams<FormInList>>(initialPagination);

    const [loading, setLoading] = useState(true);

    const fetchList = async () => {
        const res = await list(params);
        if (res.code === 0) {
            setData(res.data as PaginationParams<FormInList>);
        }
        setLoading(false);
    }

    useEffect(() => {   
        fetchList();
    }, [params]);

    return (
        <div className="grid grid-rows-[56px_1fr_56px] gap-4 h-full">
            <Card className="h-full">
                <CardBody className="pt-3">
                    <Actions params={params} setParams={setParams} tableSelectedKeys={selectedKeys} currentPageIds={data.data.map(item => item.id)} data={data} setData={setData}/>
                </CardBody>
            </Card>
            <Card className="h-full">
                <CardBody className="h-full">
                    <Scroll>
                        <TableList loading={loading} data={data} setData={setData} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys}/>
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