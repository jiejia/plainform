'use client'

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { CookieKey } from '@/features/core/constants/cookie-key';
import { Setting } from '@/features/core/types/app';

export function CookieInitializer({ setting }: { setting: Setting }) {
  useEffect(() => {
    // Set default cookies if they don't exist
    if (!Cookies.get(CookieKey.VISITOR_THEME)) {
      Cookies.set(CookieKey.VISITOR_THEME, setting.appearances.theme, { expires: 365 });
    }
    
    if (!Cookies.get(CookieKey.VISITOR_LANG)) {
      Cookies.set(CookieKey.VISITOR_LANG, setting.general.default_language, { expires: 365 });
    }
  }, [setting]);

  return null;
}