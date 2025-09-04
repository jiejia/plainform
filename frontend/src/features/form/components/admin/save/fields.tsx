'use client'

import React from "react";
import { Field } from "@/features/form/types/field";
import { DndDroppable } from "@/features/core/components/shared/dnd-droppable";
import { DndSortableItem } from "@/features/core/components/shared/dnd-sortable-item";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function Fields({ fields }: { fields: Field[] }) {
    return (
        <DndDroppable id={"fields-" + fields.length} className="h-full">
            <SortableContext items={fields.map((_, index) => index)} strategy={verticalListSortingStrategy}>
                <ul id="fields" className="grid grid-cols-1 gap-2 h-full content-start">
                    {fields.map((field, index) => (
                        <DndSortableItem id={"field-" + index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors" key={index}>
                            <span className="text-sm font-medium text-gray-700">{field.title}</span>
                            <span className="text-xs text-gray-500 px-2 py-1 rounded-full">{field.control_name}</span>
                        </DndSortableItem>
                    ))}
                </ul>
            </SortableContext>
        </DndDroppable>
    )
}