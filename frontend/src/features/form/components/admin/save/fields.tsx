'use client'

import React from "react";
import { Field } from "@/features/form/types/field";
import { DndDroppable } from "@/features/core/components/shared/dnd-droppable";
import { DndSortableItem } from "@/features/core/components/shared/dnd-sortable-item";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import clsx from "clsx";

export default function Fields({ fields, setCurrentField, setFields, setTabSelectedKey }: { fields: Field[], setCurrentField: (field: Field) => void, setFields: (fields: Field[]) => void, setTabSelectedKey: (key: string | number) => void }) {

    const handleFieldClick = (
        e: React.MouseEvent<HTMLElement>,
        index: number
    ) => {
        const updatedFields = fields.map((field: Field, key: number) => {
            if (key == index) {
                return { ...field, active: true };
            } else {
                return { ...field, active: false };
            }
        });

        fields.forEach((item: Field, key: number) => {
            if (key == index) setCurrentField(item);
        });

        setFields(updatedFields);
        setTabSelectedKey("field-property");
    };


    return (
        <DndDroppable id={"fields-" + fields.length} className="h-full">
            <SortableContext items={fields.map((_, index) => `field-${index}`)} strategy={verticalListSortingStrategy}>
                <ul id="fields" className="grid grid-cols-1 gap-2 h-full content-start">
                    {fields.map((field, index) => (
                        <DndSortableItem
                            id={"field-" + index}
                            className={clsx("flex items-center justify-between p-3 rounded-lg border border-gray-400 hover:bg-gray-100 transition-colors", { "outline -outline-offset-2 outline-2 outline-primary": fields[index].active })}
                            key={index}
                            onClick={(e) => handleFieldClick(e, index)}
                        >
                            <span className="text-sm font-medium text-gray-700">{field.title}</span>
                            <span className="text-xs text-gray-500 px-2 py-1 rounded-full">{field.control_name}</span>
                        </DndSortableItem>
                    ))}
                </ul>
            </SortableContext>
        </DndDroppable>
    )
}