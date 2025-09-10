'use client'

import React from "react";
import {
    Button,
    Input,
    DateRangePicker,
    Select,
    SelectItem,
    Selection,
} from "@heroui/react";
import {
    EllipsisVertical,
    ArrowDownUp,
    Pause,
    Play,
    Trash2,
    Search,
    RefreshCw,
    ListFilterPlus,
    Hash,
    Activity,
} from "lucide-react";
import { parseDateTime } from "@internationalized/date";
import FormModal from "@/features/core/components/admin/form-modal";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Link,
} from "@heroui/react";



export default function Actions() {


    const sortOptions = [
        { key: "id_desc", text: "按ID/创建时间倒序" },
        { key: "id_asc", text: "按ID/创建时间顺序" },
        { key: "title_desc", text: "按名称倒序" },
        { key: "title_asc", text: "按名称顺序" },
        { key: "submissions_desc", text: "按提交数倒序" },
        { key: "submissions_asc", text: "按提交数顺序" },
        { key: "enabled_desc", text: "按状态倒序" },
        { key: "enabled_asc", text: "按状态顺序" },
    ];

    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["id_desc"]));

    return (
        <>
            <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                <div>
                    <form>
                        <Input
                            label=""
                            type="text"
                            size="sm"
                            placeholder="搜索表单..."
                            startContent={<Search size="16" />}
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
                        <RefreshCw size="16" />
                    </Button>
                    <FormModal title="高级搜索" footer={null} button={
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
                                    />
                                    <Input
                                        type="number"
                                        placeholder="999"
                                        startContent={<Hash size="16" className="text-default-400" />}
                                        labelPlacement="outside"
                                        min="0"
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
                                    selectionMode="multiple"
                                >
                                    <SelectItem key="active">
                                        启用
                                    </SelectItem>
                                    <SelectItem key="inactive">
                                        禁用
                                    </SelectItem>
                                    <SelectItem key="draft">
                                        草稿
                                    </SelectItem>
                                    <SelectItem key="archived">
                                        已归档
                                    </SelectItem>
                                </Select>
                            </div>
                        </div>
                    </FormModal>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Button isIconOnly className="capitalize" variant="flat" size="sm">
                                <ArrowDownUp size="16" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Single selection example"
                            selectedKeys={selectedKeys}
                            selectionMode="single"
                            variant="flat"
                            onSelectionChange={setSelectedKeys}
                        >
                            {sortOptions.map((option) => (
                                <DropdownItem
                                    key={option.key}
                                    textValue={option.text}
                                >
                                    {option.text}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Button isIconOnly className="capitalize" variant="flat" size="sm">
                                <EllipsisVertical size="16" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="pause" startContent={<Pause size="16" />}>批量暂停</DropdownItem>
                            <DropdownItem key="reactive" startContent={<Play size="16" />}>批量激活</DropdownItem>
                            <DropdownItem key="delete" className="text-danger" color="danger" startContent={<Trash2 size="16" />}>
                                批量删除
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
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
        </>
    );
}