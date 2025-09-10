'use client';

import React from "react";
import Scroll from "@/features/core/components/shared/scroll";
import {
    Card,
    CardBody,

} from "@heroui/react";

import Actions from "./actions";
import TableList from "./table-list";
import Pagenate from "./pagenate";
import { useState, useEffect } from "react";
import { SearchParams } from "@/features/form/types/list/search-params";
import { list } from "@/features/form/actions/form-action";
import { msg } from "@/features/core/utils/ui";

export default function Index() {

    const [params, setParams] = useState<SearchParams>({
        page: 1,
        limit: 10,
        keyword: '',
        createdAtStart: '',
        createdAtEnd: '',
        submissionsCountStart: 0,
        submissionsCountEnd: 0,
        status: [],
        orderBy: 'id',
        orderType: 'desc',
    });

    const fetchList = async () => {
        try {
            const res = await list(params);
            console.log(res);
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
                    <Actions />
                </CardBody>
            </Card>
            <Card className="h-full">
                <CardBody className="h-full">
                    <Scroll>
                        <TableList />
                    </Scroll>
                </CardBody>
            </Card>
            <Card>
                <CardBody className="grid sm:grid-cols-[80px_1fr_80px] grid-cols-[1fr] pt-3 gap-2">
                    <Pagenate />
                </CardBody>
            </Card>
        </div>
    );
}