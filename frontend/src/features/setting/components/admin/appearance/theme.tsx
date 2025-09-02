'use client'

import { Monitor, Sun, Moon } from "lucide-react";
import { Select, SelectItem, SharedSelection } from "@heroui/react";
import { setOptions as setOptionsAction } from '@/features/setting/actions/setting-action';


export default function Theme({ options, setOptions }: { options: any, setOptions: any }) {

    const themes = [
        {
            key: "system",
            label: "系统",
            icon: <Monitor className="w-4 h-4" />
        },
        {
            key: "light",
            label: "浅色",
            icon: <Sun className="w-4 h-4" />
        },
        {
            key: "dark",
            label: "深色",
            icon: <Moon className="w-4 h-4" />
        },

        {
            key: "blue",
            label: "蓝色",
            color: "#006FEE"
        },
        {
            key: "purple",
            label: "紫色",
            color: "#7C3AED"
        },
        {
            key: "green",
            label: "绿色",
            color: "#17C964"
        },
        {
            key: "yellow",
            label: "黄色",
            color: "#F5A524"
        },
        {
            key: "red",
            label: "红色",
            color: "#F31260"
        },
    ];

    const handleChange = (keys: SharedSelection) => {
        const selected = keys.currentKey as string;
        setOptions({ ...options, theme: { value: selected } });
        setOptionsAction('appearances', 'theme', selected);
    }   

    return (
        <Select
            placeholder="选择主题"
            selectedKeys={[options.theme.value]}
            onSelectionChange={handleChange}
            className="w-48"
            size="sm"
            variant="bordered"
            renderValue={(items) => {
                return items.map((item) => {
                    const theme = themes.find(t => t.key === item.key);
                    if (!theme) return null;
                    return (
                        <div key={item.key} className="flex items-center gap-2">
                            {theme.icon ? (
                                theme.icon
                            ) : (
                                <div
                                    className="w-4 h-4 rounded-full border border-default-300"
                                    style={{ backgroundColor: theme.color }}
                                />
                            )}
                            <span>{theme.label}</span>
                        </div>
                    );
                });
            }}
        >
            {themes.map((theme) => (
                <SelectItem
                    key={theme.key}
                    textValue={theme.label}
                    startContent={
                        theme.icon ? (
                            theme.icon
                        ) : (
                            <div
                                className="w-4 h-4 rounded-full border border-default-300"
                                style={{ backgroundColor: theme.color }}
                            />
                        )
                    }
                >
                    {theme.label}
                </SelectItem>
            ))}
        </Select>
    );
}