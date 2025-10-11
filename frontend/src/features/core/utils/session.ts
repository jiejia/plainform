import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { CookieKey } from '@/features/core/constants/cookie-key';

const SESSION_COOKIE_NAME = CookieKey.VISITOR_ID;
const SESSION_EXPIRY_DAYS = 30; // 30天有效期

/**
 * 获取或生成访客唯一标识
 */
export function getOrCreateVisitorId(): string {
    // 先尝试从 cookie 中获取
    let visitorId = Cookies.get(SESSION_COOKIE_NAME);
    
    if (!visitorId) {
        // 如果不存在，生成新的 UUID
        visitorId = uuidv4();
        
        // 保存到 cookie（30天有效期）
        Cookies.set(SESSION_COOKIE_NAME, visitorId, {
            expires: SESSION_EXPIRY_DAYS,
            path: '/',
            sameSite: 'lax'
        });
    }
    
    return visitorId;
}