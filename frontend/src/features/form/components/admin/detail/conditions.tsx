'use client'

import React from "react";
import { Select, SelectItem } from "@heroui/react";

export default function Conditions() {

    const animals = [
        { key: "cat", label: "版本1" },
        { key: "dog", label: "版本2" },
        { key: "bird", label: "版本3" },
    ];

    const range = [
        { key: "1", label: "7天" },
        { key: "2", label: "30天" },
        { key: "3", label: "60天" },
    ];

    return (
        <div className="grid grid-flow-col items-center gap-2 justify-end">
            <Select
                isRequired
                className="w-24"
                defaultSelectedKeys={["cat"]}
                placeholder="Select an animal"
                size="sm"
            >
                {animals.map((animal) => (
                    <SelectItem key={animal.key}>{animal.label}</SelectItem>
                ))}
            </Select>
            <Select
                isRequired
                className="w-24"
                defaultSelectedKeys={["1"]}
                placeholder="Select an animal"
                size="sm"
            >
                {range.map((v) => (
                    <SelectItem key={v.key}>{v.label}</SelectItem>
                ))}
            </Select>
        </div>
    )
}