'use client'

import { Trash2 } from "lucide-react";
import React from "react";
import {DndDroppable} from "@/features/core/components/shared/dnd-droppable";

export default function Recycle() {
    return (
        <DndDroppable
            id="recycle"
            className="p-6 bg-content3 rounded-lg flex justify-center items-center h-8 w-full cursor-pointer hover:bg-content3"
        >
            <Trash2 size={16} />
        </DndDroppable>
    )
}