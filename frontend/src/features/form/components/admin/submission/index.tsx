'use client';

import React, { useState } from "react";
import Scroll from "@/features/core/components/shared/scroll";
import {
    Card,
    CardBody,
    Selection,
} from "@heroui/react";
import { Form as FormType } from "@/features/form/types/form";
import Paginate from "./paginate";
import TableList from "./table-list";
import Actions from "./actions";
import { SearchParams } from "@/features/form/types/submission/search-params";
import { initialSearchParams } from "@/features/form/data/submission/initial-search-params";
import { PaginationParams } from "@/features/core/types/pagination-params";
import { Submission } from "@/features/form/types/submission/submission";
import { initialPagination } from "@/features/form/data/initial-pagination";
import { list } from "@/features/form/actions/admin/submission-action";
import { useEffect } from "react";

export default function Index({ form, versions }: { form: FormType, versions: number[] }) {

    // set version to the latest version
    initialSearchParams.version = versions[versions.length - 1];

    const formId = form.id as number;

    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [params, setParams] = useState<SearchParams>(initialSearchParams);
    const [data, setData] = useState<PaginationParams<Submission>>(initialPagination);

    const fetchList = async () => {
        try {
            const res = await list(form.id as number, params);
            setData(res.data as PaginationParams<Submission>);   
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {   
        fetchList();
    }, [params]);


    return (<div className="grid grid-rows-[56px_1fr_56px] gap-4 h-full">
        <Card className="h-full">
            <CardBody className="pt-3"> 
                <Actions formId={formId} params={params} setParams={setParams} tableSelectedKeys={selectedKeys} currentPageIds={data.data.map(item => item.id)} data={data} setData={setData} versions={versions} initialSearchParams={initialSearchParams}/>
            </CardBody>
        </Card>
        <Card className="h-full">
            <CardBody className="h-full">
                <Scroll>
                    <TableList formId={formId} data={data} setData={setData} setParams={setParams} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} initialSearchParams={initialSearchParams}/>
                </Scroll>
            </CardBody>
        </Card>
        <Card>
            <CardBody className="grid sm:grid-cols-[80px_1fr_80px] grid-cols-[1fr] pt-3 gap-2">
                <Paginate data={data} params={params} setParams={setParams}/>
            </CardBody>
        </Card>
    </div>);
}