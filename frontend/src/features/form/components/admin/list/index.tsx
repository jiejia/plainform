'use client';

import React from "react";
import Block from "@/features/core/components/shared/block";
import Scroll from "@/features/core/components/shared/scroll";
import {Button, Input, Link, Pagination, Select, Selection, SelectItem} from "@heroui/react";
import {getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import {ArrowDownUp, EllipsisVertical, ListFilterPlus, RefreshCw, Search} from "lucide-react";

export default function Index() {

    const rows = [{
        key: "1", name: "Tony Reichert", role: "CEO", status: "Active",
    }, {
        key: "2", name: "Zoey Lang", role: "Technical Lead", status: "Paused",
    }, {
        key: "3", name: "Jane Fisher", role: "Senior Developer", status: "Active",
    }, {
        key: "4", name: "William Howard", role: "Community Manager", status: "Vacation",
    },];

    const columns = [{
        key: "name", label: "NAME",
    }, {
        key: "role", label: "ROLE",
    }, {
        key: "status", label: "STATUS",
    },];

    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["2"]));


    return (<div className="grid grid-rows-[56px_1fr_56px] gap-4 h-full">
            <Block className="h-full pt-3">
                <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                    <div>
                        <form>
                            <Input
                                label=""
                                type="text"
                                size="sm"
                                placeholder="搜索表单..."
                                startContent={<Search size="16"/>}
                            />
                        </form>
                    </div>
                    <div className="grid grid-flow-col gap-2">
                        <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            title="refresh"
                        >
                            <RefreshCw size="16"/>
                        </Button>
                        <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            title="advanced search"
                        >
                            <ListFilterPlus size="16"/>
                        </Button>
                        <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            title="order by"
                        >
                            <ArrowDownUp size="16"/>
                        </Button>
                        <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            title="order by"
                        >
                            <EllipsisVertical size="16"/>
                        </Button>
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
            </Block>
            <Block className="pr-2 h-full">
                <Scroll>
                    <Table
                        aria-label="Controlled table example with dynamic content"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                        selectionMode="multiple"
                        removeWrapper
                    >
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={rows}>
                            {(item) => (<TableRow key={item.key}>
                                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                </TableRow>)}
                        </TableBody>
                    </Table>
                </Scroll>
            </Block>
            <Block className="grid sm:grid-cols-[80px_1fr_80px] grid-cols-[1fr] pt-3 gap-2">
                <div className="hidden sm:block justify-items-center content-center">
                    Total 10
                </div>
                <div className="justify-items-center content-center">
                    <Pagination
                        showControls
                        showShadow
                        color="primary"
                        page={10}
                        total={10}
                        size={"sm"}
                    />
                </div>
                <div className="hidden sm:block justify-items-center content-center">
                    <Select
                        disallowEmptySelection
                        selectionMode="single"
                        className="max-w-xs"
                        size="sm"

                    >
                        {[20, 30, 50, 100].map((size) => (<SelectItem key={size} textValue={size.toString()}>
                                {size}
                            </SelectItem>))}
                    </Select>
                </div>
            </Block>
        </div>);
}