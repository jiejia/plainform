'use client'

import React from "react";
import { DraggableItem } from "@/features/form/types/draggable-item";
import { Field } from "@/features/form/types/field";
import { Control } from "@/features/form/types/control";
import { DragOverlay } from "@dnd-kit/core";
import { Item } from "@/features/core/components/shared/item";
import clsx from "clsx";
import * as Icons from 'lucide-react'
import { useTranslations } from 'next-intl';

export default function Overlay({ activeItem, fields, controls }: { activeItem: DraggableItem, fields: Field[], controls: Control[] }) {
    const t = useTranslations();

    // get control icon component
    let Icon = Icons.Circle;
    if (activeItem && activeItem.area === "control" && controls[activeItem.id]) {
        Icon = (Icons as any)[controls[activeItem.id].icon]
    }
    
    return (
        <DragOverlay>
            {activeItem &&
                (activeItem.area === "control"
                    ? controls[activeItem.id] && (
                        <Item
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-content2 cursor-pointer border border-default-400 transition-colors">
                            <Icon size={18} className="text-primary" />
                            <span className="text-sm font-medium">{t(`form.${controls[activeItem.id].type}`)}</span>
                        </Item>
                    )
                    : fields[activeItem.id] && (
                        <Item className={clsx("flex items-center justify-between p-3 rounded-lg border border-default-400 hover:bg-content2 transition-colors", { "outline -outline-offset-2 outline-2 outline-primary": fields[activeItem.id].active })}>
                            <span className="text-sm font-medium">{fields[activeItem.id].title}</span>
                            <span className="text-xs px-2 py-1 rounded-full">{t(`form.${fields[activeItem.id].control_type}`)}</span>
                        </Item>
                    ))}
        </DragOverlay>
    )
}