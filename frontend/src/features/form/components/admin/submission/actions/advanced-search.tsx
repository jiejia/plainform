'use client';

import React, { useState } from 'react';
import {
    Button,
    Card,
    CardBody,
    Input,
    Select,
    SelectItem,
    DateRangePicker,
    DatePicker,
    Chip,
    Divider
} from '@heroui/react';
import { X } from 'lucide-react';
import { parseDate } from '@internationalized/date';

export type FieldType = 'string' | 'number' | 'date' | 'dateRange' | 'select' | 'boolean';

export interface SearchField {
    key: string;
    label: string;
    type: FieldType;
    options?: { key: string; label: string }[]; // 用于 select 类型
}

export interface SearchCondition {
    id: string;
    field: string;
    fieldType: FieldType;
    operator?: string;
    value?: any;
    startValue?: any;
    endValue?: any;
}

interface AdvancedSearchProps {
    fields: SearchField[];
    onSearch: (conditions: SearchCondition[]) => void;
    onReset: () => void;
}

const getOperatorsByType = (type: FieldType) => {
    switch (type) {
        case 'string':
            return [
                { key: 'contains', label: '包含' },
                { key: 'equals', label: '等于' },
                { key: 'startsWith', label: '开始于' },
                { key: 'endsWith', label: '结束于' },
                { key: 'notContains', label: '不包含' }
            ];
        case 'number':
            return [
                { key: 'equals', label: '等于' },
                { key: 'greaterThan', label: '大于' },
                { key: 'lessThan', label: '小于' },
                { key: 'greaterThanOrEqual', label: '大于等于' },
                { key: 'lessThanOrEqual', label: '小于等于' },
                { key: 'between', label: '介于' }
            ];
        case 'date':
            return [
                { key: 'equals', label: '等于' },
                { key: 'after', label: '晚于' },
                { key: 'before', label: '早于' }
            ];
        case 'dateRange':
            return [
                { key: 'between', label: '时间范围' }
            ];
        case 'select':
            return [
                { key: 'equals', label: '等于' },
                { key: 'notEquals', label: '不等于' }
            ];
        case 'boolean':
            return [
                { key: 'equals', label: '等于' }
            ];
        default:
            return [];
    }
};

export default function AdvancedSearch({ fields, onSearch, onReset }: AdvancedSearchProps) {
    const [searchConditions, setSearchConditions] = useState<SearchCondition[]>([]);
    const [selectedFieldKeys, setSelectedFieldKeys] = useState<Set<string>>(new Set());

    // 当选择的字段发生变化时，同步更新搜索条件
    const handleFieldSelectionChange = (keys: Set<string>) => {
        setSelectedFieldKeys(keys);
        
        // 添加新选中的字段
        const newFieldKeys = Array.from(keys).filter(key => 
            !searchConditions.some(condition => condition.field === key)
        );
        
        // 移除取消选中的字段
        const removedFieldKeys = searchConditions
            .map(condition => condition.field)
            .filter(field => !keys.has(field));

        let newConditions = [...searchConditions];

        // 移除取消选中的条件
        newConditions = newConditions.filter(condition => 
            !removedFieldKeys.includes(condition.field)
        );

        // 添加新选中字段的条件
        newFieldKeys.forEach(fieldKey => {
            const field = fields.find(f => f.key === fieldKey);
            if (field) {
                const newCondition: SearchCondition = {
                    id: `${fieldKey}_${Date.now()}`,
                    field: fieldKey,
                    fieldType: field.type,
                    operator: getOperatorsByType(field.type)[0]?.key
                };
                newConditions.push(newCondition);
            }
        });

        setSearchConditions(newConditions);
    };

    const removeCondition = (conditionId: string) => {
        const condition = searchConditions.find(c => c.id === conditionId);
        if (condition) {
            // 从选中的字段中移除
            const newSelectedKeys = new Set(selectedFieldKeys);
            newSelectedKeys.delete(condition.field);
            setSelectedFieldKeys(newSelectedKeys);
        }
        setSearchConditions(prev => prev.filter(c => c.id !== conditionId));
    };

    const updateCondition = (conditionId: string, updates: Partial<SearchCondition>) => {
        setSearchConditions(prev =>
            prev.map(condition =>
                condition.id === conditionId
                    ? { ...condition, ...updates }
                    : condition
            )
        );
    };

    const handleReset = () => {
        setSearchConditions([]);
        setSelectedFieldKeys(new Set());
        onReset();
    };

    const handleSearch = () => {
        const validConditions = searchConditions.filter(condition => {
            if (condition.fieldType === 'dateRange') {
                return condition.startValue && condition.endValue;
            }
            if (condition.fieldType === 'number' && condition.operator === 'between') {
                return condition.startValue !== undefined && condition.endValue !== undefined;
            }
            return condition.value !== undefined && condition.value !== '';
        });
        onSearch(validConditions);
    };

    const renderConditionInput = (condition: SearchCondition) => {
        const field = fields.find(f => f.key === condition.field);
        if (!field) return null;

        switch (condition.fieldType) {
            case 'string':
                return (
                    <Input
                        size="sm"
                        placeholder="输入搜索内容"
                        value={condition.value || ''}
                        onValueChange={(value) => updateCondition(condition.id, { value })}
                    />
                );

            case 'number':
                if (condition.operator === 'between') {
                    return (
                        <div className="flex gap-2 items-center">
                            <Input
                                size="sm"
                                type="number"
                                placeholder="最小值"
                                value={condition.startValue || ''}
                                onValueChange={(value) => updateCondition(condition.id, { startValue: Number(value) })}
                            />
                            <span className="text-small text-default-400">到</span>
                            <Input
                                size="sm"
                                type="number"
                                placeholder="最大值"
                                value={condition.endValue || ''}
                                onValueChange={(value) => updateCondition(condition.id, { endValue: Number(value) })}
                            />
                        </div>
                    );
                }
                return (
                    <Input
                        size="sm"
                        type="number"
                        placeholder="输入数值"
                        value={condition.value || ''}
                        onValueChange={(value) => updateCondition(condition.id, { value: Number(value) })}
                    />
                );

            case 'date':
                return (
                    <DatePicker
                        size="sm"
                        value={condition.value}
                        onChange={(value) => updateCondition(condition.id, { value })}
                    />
                );

            case 'dateRange':
                return (
                    <DateRangePicker
                        size="sm"
                        value={condition.startValue && condition.endValue ? {
                            start: condition.startValue,
                            end: condition.endValue
                        } : null}
                        onChange={(range) => updateCondition(condition.id, {
                            startValue: range?.start,
                            endValue: range?.end
                        })}
                    />
                );

            case 'select':
                return (
                    <Select
                        size="sm"
                        placeholder="请选择"
                        selectedKeys={condition.value ? [condition.value] : []}
                        onSelectionChange={(keys) => {
                            const value = Array.from(keys)[0];
                            updateCondition(condition.id, { value });
                        }}
                    >
                        {field.options?.map((option) => (
                            <SelectItem key={option.key}>
                                {option.label}
                            </SelectItem>
                        )) || []}
                    </Select>
                );

            case 'boolean':
                return (
                    <Select
                        size="sm"
                        placeholder="请选择"
                        selectedKeys={condition.value !== undefined ? [condition.value.toString()] : []}
                        onSelectionChange={(keys) => {
                            const value = Array.from(keys)[0] === 'true';
                            updateCondition(condition.id, { value });
                        }}
                    >
                        <SelectItem key="true">是</SelectItem>
                        <SelectItem key="false">否</SelectItem>
                    </Select>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-4">
            {/* 字段多选器 */}
            <Select
                size="sm"
                placeholder="选择要搜索的字段"
                selectedKeys={selectedFieldKeys}
                onSelectionChange={(keys) => {
                    const keySet = new Set(Array.from(keys as Set<string>));
                    handleFieldSelectionChange(keySet);
                }}
                selectionMode="multiple"
                className="w-full"
            >
                {fields.map((field) => (
                    <SelectItem key={field.key}>
                        {field.label}
                    </SelectItem>
                ))}
            </Select>

            {/* 搜索条件 */}
            {searchConditions.length > 0 && (
                <div>
                    <h4 className="text-small font-medium mb-2">搜索条件：</h4>
                    <div className="space-y-3">
                        {searchConditions.map((condition, index) => {
                            const field = fields.find(f => f.key === condition.field);
                            const operators = getOperatorsByType(condition.fieldType);
                            
                            return (
                                <Card key={condition.id} className="p-3">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <Chip size="sm" variant="flat" color="primary">
                                                    {field?.label}
                                                </Chip>
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    color="danger"
                                                    onClick={() => removeCondition(condition.id)}
                                                >
                                                    <X size={16} />
                                                </Button>
                                            </div>
                                            
                                            {operators.length > 1 && (
                                                <Select
                                                    size="sm"
                                                    label="操作符"
                                                    selectedKeys={condition.operator ? [condition.operator] : []}
                                                    onSelectionChange={(keys) => {
                                                        const operator = Array.from(keys)[0] as string;
                                                        updateCondition(condition.id, { operator });
                                                    }}
                                                >
                                                    {operators.map((op) => (
                                                        <SelectItem key={op.key}>
                                                            {op.label}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                            )}
                                            
                                            <div>
                                                {renderConditionInput(condition)}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            )}

        </div>
    );
}
