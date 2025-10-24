'use client'

import * as Icons from 'lucide-react'
import React from "react";
import { Control } from "@/features/form/types/control";
import { DndSortableItem } from "@/features/core/components/shared/dnd-sortable-item";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useTranslations } from 'next-intl';


export default function Controls({ controls }: { controls: Control[] }) {

    const t = useTranslations('form');
    return (
        <SortableContext items={controls.map((_, index) => `control-${index}`)} strategy={verticalListSortingStrategy}>
            <ul className="grid grid-cols-1 gap-2 h-full content-start" id="controls">
                {controls.map((control, index) => {
                    const Icon = (Icons as any)[control.icon] ?? Icons.Circle
                    return (
                        <DndSortableItem
                            key={index}
                            id={"control-" + index}
                            className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer border border-default-400 transition-colors"
                        >
                            <Icon size={18} className="text-primary" />
                            <span className="text-sm font-medium">{t(control.type)}</span>
                        </DndSortableItem>
                    )
                })}
            </ul>
        </SortableContext>
    )
}