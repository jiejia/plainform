'use client'

import * as Icons from 'lucide-react'
import React from "react";
import { Control } from "@/features/form/types/control";
import { DndSortableItem } from "@/features/core/components/shared/dnd-sortable-item";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";


export default function Controls({ controls }: { controls: Control[] }) {
    return (
        <SortableContext items={controls.map((_, index) => `control-${index}`)} strategy={verticalListSortingStrategy}>
            <ul className="grid grid-cols-1 gap-2 h-full content-start" id="controls">
                {controls.map((control, index) => {
                    const Icon = (Icons as any)[control.icon] ?? Icons.Circle
                    return (
                        <DndSortableItem
                            key={index}
                            id={"control-" + index}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-400 transition-colors"
                        >
                            <Icon size={18} className="text-blue-500" />
                            <span className="text-sm font-medium">{control.name}</span>
                        </DndSortableItem>
                    )
                })}
            </ul>
        </SortableContext>
    )
}