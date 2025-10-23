'use client'

import { Select, SelectItem, SharedSelection } from "@heroui/react";
import { setOptions as setOptionsAction } from '@/features/setting/actions/setting-action';
import { Option } from '@/features/setting/types/general-option';
import { Language } from '@/features/setting/types/language';
import Cookies from 'js-cookie'
import { CookieKey } from '@/features/core/constants/cookie-key';
import { useTranslations } from 'next-intl';
import { msg } from "@/features/core/utils/ui";

export default function DefaultLanguage({ options, setOptions, languages }: { options: Option, setOptions: any, languages: Language[] }) {
    const t = useTranslations();

    const handleLanguageChange = async (value: SharedSelection) => {
        setOptions({ ...options, default_language: value.currentKey as string });
        const res = await setOptionsAction('general', 'default_language', value.currentKey as string);
        if (res.code === 0) {
            msg(t('setting.language_save_success'), t('setting.language_save_success'), 'success');
            Cookies.set(CookieKey.LANGUAGE, value.currentKey as string, { expires: 365 });
        } else {
            msg(t('setting.language_save_failed'), t(res.msg), 'warning');
        }
    };

    return <>
        <Select
            className="w-40"
            placeholder={t('setting.select_language')}
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