'use client';

import React from "react";
import Scroll from "@/features/core/components/shared/scroll";
import {
    Card,
    CardBody,

} from "@heroui/react";
import { Form as FormType } from "@/features/form/types/form";
import Paginate from "./paginate";
import TableList from "./table-list";
import Actions from "./actions";

export default function Index({ form }: { form: FormType }) {

    return (<div className="grid grid-rows-[56px_1fr_56px] gap-4 h-full">
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
                <Paginate />
            </CardBody>
        </Card>
    </div>);
}