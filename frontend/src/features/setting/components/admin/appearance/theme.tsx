'use client'

import { Monitor, Sun, Moon } from "lucide-react";
import { Select, SelectItem, SharedSelection } from "@heroui/react";
import { setOptions as setOptionsAction } from '@/features/setting/actions/setting-action';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes'


export default function Theme({ options, setOptions }: { options: any, setOptions: any }) {
    const t = useTranslations();
    const { theme, setTheme } = useTheme()


    const themes = [
        {
            key: "system",
            label: t('setting.system'),
            icon: <Monitor className="w-4 h-4" />
        },
        {
            key: "light",
            label: t('setting.light'),
            icon: <Sun className="w-4 h-4" />
        },
        {
            key: "dark",
            label: t('setting.dark'),
            icon: <Moon className="w-4 h-4" />
        },

    ];

    const handleChange = (keys: SharedSelection) => {
        const selected = keys.currentKey as string;
        setOptions({ ...options, theme: selected });
        setOptionsAction('appearances', 'theme', selected);
        setTheme(selected);
    }   

    return (
        <Select
            placeholder={t('setting.select_theme')}
            selectedKeys={[options.theme]}
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
                                    style={{ backgroundColor: theme.key === options.theme ? 'var(--theme-color)' : 'transparent' }}
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
                                style={{ backgroundColor: theme.key === options.theme ? 'var(--theme-color)' : 'transparent' }}
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