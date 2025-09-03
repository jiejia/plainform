'use client'

import React from "react";
import { Field } from "@/features/form/types/field";

export default function Fields({ fields }: { fields: Field[] }) {
    return (
        <ul className="grid grid-cols-1 gap-2 h-full">
            {fields.map((field) => (
                <li className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors" key={field.id}>
                    <span className="text-sm font-medium text-gray-700">{field.title}</span>
                    <span className="text-xs text-gray-500 px-2 py-1 rounded-full">{field.control_name}</span>
                </li>
            ))}
        </ul>
    )
}