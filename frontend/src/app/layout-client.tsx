'use client'

import { useEffect, useState } from 'react';
import { Setting } from '@/features/core/types/app';
import { getOptions } from '@/features/setting/actions/setting-action';
import { Providers } from './providers';
import { defaultSetting } from '@/features/core/data/default-setting';


export function LayoutClient({ children }: { children: React.ReactNode }) {

    const getSetting = async () => {
        const res = await getOptions([], ['theme', 'default_language']);
        return res;
    }

    const [setting, setSetting] = useState<Setting>(defaultSetting);

    useEffect(() => {
        getSetting().then(res => {
            setSetting(res);
        });
    }, [setting]);

    return (
        <html lang={setting.general.default_language} className={setting.appearances.theme}>
            <body
                className={`antialiased min-h-screen`}
            >
                <Providers setting={setting as Setting}>
                    {children}
                </Providers>
            </body>
        </html>
    )
}