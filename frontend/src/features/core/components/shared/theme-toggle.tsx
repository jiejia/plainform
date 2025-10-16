'use client'

import { Button } from "@heroui/react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useState, useEffect } from "react";
import { LocalStorageKey } from "../../constants/localstorage-key";

type Theme = 'light' | 'dark' | 'system';

export default function ThemeToggle({ className }: { className: string }) {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        // Initialize theme from localStorage
        const savedTheme = localStorage.getItem(LocalStorageKey.THEME) as Theme | undefined;
        const initialTheme = savedTheme || 'light';
        setTheme(initialTheme);

        // Listen for storage events from other tabs to update button icon
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === LocalStorageKey.THEME && e.newValue) {
                const newTheme = e.newValue as Theme;
                setTheme(newTheme);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

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
        localStorage.setItem(LocalStorageKey.THEME, newTheme);
        
        // Manually apply theme for current tab (storage event won't fire in same tab)
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