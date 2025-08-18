'use client';

import React from "react";
import Scroll from "@/features/core/components/shared/scroll";
import AdvancedSearch, { SearchField, SearchCondition } from "./advanced-search";
import {
    Button,
    Card,
    CardBody,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Link,
    Pagination,
    Select,
    Selection,
    SelectItem,
    useDisclosure,
    SharedSelection,
    DatePicker,
    DateRangePicker
} from "@heroui/react";
import {parseDateTime} from "@internationalized/date";
import {getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import {
    EllipsisVertical, ListFilterPlus, RefreshCw, Search, ArrowDownUp, Calendar, Hash, Activity, Pause, Play, Trash2,
    Pencil, Eye, Copy
} from "lucide-react"
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";



export default function Index() {

    // 定义搜索字段配置
    const searchFields: SearchField[] = [
        { key: 'id', label: 'ID', type: 'number' },
        { key: 'name', label: '名称', type: 'string' },
        { key: 'created_at', label: '创建时间', type: 'dateRange' },
        { key: 'submission_count', label: '提交数', type: 'number' },
        { 
            key: 'status', 
            label: '状态', 
            type: 'select',
            options: [
                { key: 'active', label: '激活' },
                { key: 'inactive', label: '暂停' },
                { key: 'draft', label: '草稿' }
            ]
        }
    ];

    const rows = [{
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    },{
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    },{
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    },{
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    },{
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    },{
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    },{
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    },{
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    },{
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    },{
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    },{
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    },{
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    },{
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    },{
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    },{
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    },{
        key: "1",
        id: 1,
        name: "Tony Reichert",
        created_at: "CEO",
        submission_count: 10,
        status: "active",
        action: "edit",
    }];

    const columns = [{
        key: "id", label: "ID",
    }, {
        key: "name", label: "名称",
    }, {
        key: "created_at", label: "创建时间",
    }, {
        key: "submission_count", label: "提交数"
    }, {
        key: "status", label: "状态"
    }, {
        key: "actions", label: "操作"
    }];

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

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["2"]));

    const [selectedKeys2, setSelectedKeys2] = React.useState<SharedSelection>(new Set(["text"]));

    const selectedValue = React.useMemo(() => Array.from(selectedKeys2).join(", ").replace(/_/g, ""), [selectedKeys2],);

    // 高级搜索处理函数
    const handleAdvancedSearch = (conditions: SearchCondition[]) => {
        console.log('搜索条件:', conditions);
        // 在这里处理搜索逻辑
        // 例如：调用API，更新表格数据等
    };

    const handleSearchReset = () => {
        console.log('重置搜索');
        // 在这里处理重置逻辑
        // 例如：清空搜索条件，重新加载数据等
    };


    return (<div className="grid grid-rows-[56px_1fr_56px] gap-4 h-full">
        <Card className="h-full">
            <CardBody className="pt-3">
                <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                <div>
                    <form>
                        <Input
                            label=""
                            type="text"
                            size="sm"
                            placeholder="搜索..."
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
                        onPress={onOpen}
                    >
                        <ListFilterPlus size="16"/>
                    </Button>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Button isIconOnly className="capitalize" variant="flat" size="sm">
                                <ArrowDownUp size="16"/>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Single selection example"
                            selectedKeys={selectedKeys}
                            selectionMode="single"
                            variant="flat"
                            onSelectionChange={setSelectedKeys2}
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
                                <EllipsisVertical size="16"/>
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
                </div>
                </div>
            </CardBody>
        </Card>
        <Card className="h-full">
            <CardBody className="h-full">
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
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => (
                                    <TableCell>
                                        {columnKey === "actions" ? (
                                            <Dropdown placement="bottom-end">
                                                <DropdownTrigger>
                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="light"
                                                        className="text-default-400"
                                                    >
                                                        <EllipsisVertical size="16" />
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu aria-label="Row actions">
                                                    <DropdownItem
                                                        key="edit"
                                                        startContent={<Pencil size="16" />}
                                                        href={`/dashboard/form/${item.id}/edit`}
                                                    >
                                                        编辑
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        key="view"
                                                        startContent={<Eye size="16" />}
                                                        href={`/dashboard/form/${item.id}`}
                                                    >
                                                        查看
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        key="delete"
                                                        className="text-danger"
                                                        color="danger"
                                                        startContent={<Trash2 size="16" />}
                                                    >
                                                        删除
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        ) : (
                                            getKeyValue(item, columnKey)
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                </Scroll>
            </CardBody>
        </Card>
        <Card>
            <CardBody className="grid sm:grid-cols-[80px_1fr_80px] grid-cols-[1fr] pt-3 gap-2">
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
                </div>6
            </CardBody>
        </Card>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
            <ModalContent>
                {(onClose) => (<>
                                                <ModalHeader className="flex flex-col gap-1">高级搜索</ModalHeader>
                        <ModalBody>
                            <AdvancedSearch 
                                fields={searchFields}
                                onSearch={handleAdvancedSearch}
                                onReset={handleSearchReset}
                            />
                        </ModalBody>
                        <ModalFooter>
                            {/* 移除了这里的按钮，因为 AdvancedSearch 组件内部已有按钮 */}
                        </ModalFooter>
                    </>)}
            </ModalContent>
        </Modal>
    </div>);
}