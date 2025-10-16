import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { CookieKey } from '@/features/core/constants/cookie-key'
import { Admin, Setting } from '@/features/core/types/app'
import { usePathname } from 'next/navigation'

export const AppContext = createContext({
    admin: {} as Admin,
    setAdmin: (admin: Admin) => {},
    setting: {} as Setting,
    setSetting: (setting: Setting) => {},
});

export const AppProvider = ({ children, initialSetting }: { children: React.ReactNode, initialSetting: Setting }) => {

    const [admin, setAdmin] = useState<Admin>({
        username: '',
        avatar: null,
        email: '',
    } );
    const [setting, setSetting] = useState<Setting>(initialSetting);

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
            if (admin.username || admin.avatar || admin.email) {
                setAdmin({ username: '', avatar: null, email: '' });
            }
        }

    }, [pathname]); 

    return (
        <AppContext.Provider value={{ admin, setAdmin, setting, setSetting }}>{children}</AppContext.Provider>
    );
} 

export const useAppContext = () => {
    return useContext(AppContext);
}   