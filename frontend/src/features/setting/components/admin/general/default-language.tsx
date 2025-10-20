'use client'

import { Select, SelectItem, SharedSelection } from "@heroui/react";
import { setOptions as setOptionsAction } from '@/features/setting/actions/setting-action';
import { Option } from '@/features/setting/types/general-option';
import { Language } from '@/features/setting/types/language';
import Cookies from 'js-cookie'
import { CookieKey } from '@/features/core/constants/cookie-key';
import { useTranslations } from 'next-intl';

export default function DefaultLanguage({ options, setOptions, languages }: { options: Option, setOptions: any, languages: Language[] }) {
    const t = useTranslations('setting');

    const handleLanguageChange = (value: SharedSelection) => {
        setOptions({ ...options, default_language: value.currentKey as string });
        setOptionsAction('general', 'default_language', value.currentKey as string);
        Cookies.set(CookieKey.LANGUAGE, value.currentKey as string, { expires: 365 });
    };

    return <>
        <Select
            className="w-40"
            placeholder={t('select_language')}
            id="language"
            name="language"
            size="sm"
            selectedKeys={[options.default_language]}
            onSelectionChange={handleLanguageChange}
        >
            {languages.map((language:any) => (
                <SelectItem key={language.key}>
                    {language.label}
                </SelectItem>
            ))}
        </Select>
    </>;
}