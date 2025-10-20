import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { CookieKey } from '@/features/core/constants/cookie-key';

export default getRequestConfig(async () => {
  
  const cookieStore = await cookies();
  const locale = cookieStore.get(CookieKey.LANGUAGE)?.value || 'en-us';

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default
  };
});