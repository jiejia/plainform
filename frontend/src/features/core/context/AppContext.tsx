import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { CookieKey } from '@/features/core/constants/cookie-key'
import { Admin } from '@/features/core/types/app'
import { usePathname } from 'next/navigation'

export const AppContext = createContext({
    admin: {} as Admin,
    setAdmin: (admin: Admin) => {},
    // setting: {} as any,
    // setSetting: (setting: any) => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [admin, setAdmin] = useState<Admin>({
        username: '',
        avatar: null,
        email: '',
    } );
    
    // const [setting, setSetting] = useState<any>({} as any);

    const pathname = usePathname();

    useEffect(() => {
        const adminJson = Cookies.get(CookieKey.ADMIN);
        if (adminJson) {
            const nextAdmin = JSON.parse(adminJson) as Admin;
            setAdmin((prev) => {
                if (
                    prev.username !== nextAdmin.username ||
                    prev.avatar !== nextAdmin.avatar ||
                    prev.email !== nextAdmin.email
                ) {
                    return nextAdmin;
                }
                return prev;
            });
        } else {
            // cookie 被清了（比如退出登录），重置本地上下文
            if (admin.username || admin.avatar || admin.email) {
                setAdmin({ username: '', avatar: null, email: '' });
            }
        }
        // 说明：依赖 pathname，确保每次路由切换后都会同步一次
    }, [pathname]); 

    return (
        <AppContext.Provider value={{ admin, setAdmin}}>{children}</AppContext.Provider>
    );
} 

export const useAppContext = () => {
    return useContext(AppContext);
}   