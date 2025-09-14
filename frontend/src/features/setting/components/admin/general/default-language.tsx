'use client'

import { Select, SelectItem, SharedSelection } from "@heroui/react";
import { setOptions as setOptionsAction } from '@/features/setting/actions/setting-action';

export default function DefaultLanguage({ options, setOptions }: { options: any, setOptions: any }) {

    const languages = [
        { key: "zh-CN", label: "简体中文" },
        { key: "en-US", label: "English" },
        { key: "ja-JP", label: "日本語" },
        { key: "ko-KR", label: "한국어" },
    ];

    const handleLanguageChange = (value: SharedSelection) => {
        setOptions({ ...options, default_language: value.currentKey as string });
        setOptionsAction('general', 'default_language', value.currentKey as string);
    };

    return <>
        <Select
            className="w-40"
            placeholder="请选择语言"
            id="language"
            name="language"
            size="sm"
            selectedKeys={[options.default_language]}
            onSelectionChange={handleLanguageChange}
        >
            {languages.map((language) => (
                <SelectItem key={language.key}>
                    {language.label}
                </SelectItem>
            ))}
        </Select>
    </>;
}