'use client'

import { Button } from "@heroui/react";
import { Sun, Moon, Monitor } from "lucide-react";
import { CookieKey } from "../../constants/cookie-key";
import Cookies from 'js-cookie'
import { useState, useEffect } from "react";

type Theme = 'light' | 'dark' | 'system';

export default function ThemeToggle({ className }: { className: string }) {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        const savedTheme = Cookies.get(CookieKey.VISITOR_THEME) as Theme | undefined;
        const initialTheme = savedTheme || 'light';
        setTheme(initialTheme);
        applyTheme(initialTheme);
    }, []);

    const applyTheme = (newTheme: Theme) => {
        const root = document.documentElement;

        if (newTheme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.remove('light', 'dark');
            root.classList.add(systemTheme);
        } else {
            root.classList.remove('light', 'dark');
            root.classList.add(newTheme);
        }
    };

    const handleThemeToggle = () => {
        let newTheme: Theme;

        if (theme === 'light') {
            newTheme = 'dark';
        } else if (theme === 'dark') {
            newTheme = 'system';
        } else {
            newTheme = 'light';
        }

        setTheme(newTheme);
        Cookies.set(CookieKey.VISITOR_THEME, newTheme, { expires: 365 });
        applyTheme(newTheme);
    };

    return (
        <Button 
            isIconOnly 
            aria-label="Toggle theme" 
            className={`rounded-full ${className}`} 
            onClick={handleThemeToggle}
            size="sm"
        >
            {theme === 'system' ? <Monitor size={16} /> : theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
        </Button>
    );
}