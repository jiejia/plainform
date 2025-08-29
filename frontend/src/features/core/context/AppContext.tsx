import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { CookieKey } from '@/features/core/constants/cookie-key'
import { Admin } from '@/features/core/types/app'

export const AppContext = createContext({
    admin: {} as Admin,
    setAdmin: (admin: Admin) => {},
    // setting: {} as any,
    // setSetting: (setting: any) => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [admin, setAdmin] = useState<Admin>({} as Admin);
    
    // const [setting, setSetting] = useState<any>({} as any);

    useEffect(() => {
        const admin = Cookies.get(CookieKey.ADMIN);
        if (admin) {
            setAdmin(JSON.parse(admin));
        }
    }, []);

    return (
        <AppContext.Provider value={{ admin, setAdmin}}>{children}</AppContext.Provider>
    );
} 

export const useAppContext = () => {
    return useContext(AppContext);
}   