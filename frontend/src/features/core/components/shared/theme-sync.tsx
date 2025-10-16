'use client'

import { useEffect } from "react";
import { LocalStorageKey } from "../../constants/localstorage-key";

type Theme = 'light' | 'dark' | 'system';

/**
 * ThemeSync component
 * Syncs theme changes across browser tabs by listening to localStorage events
 */
export default function ThemeSync() {
    useEffect(() => {
        // Apply theme function
        const applyTheme = (theme: Theme) => {
            const root = document.documentElement;

            if (theme === 'system') {
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                root.classList.remove('light', 'dark');
                root.classList.add(systemTheme);
            } else {
                root.classList.remove('light', 'dark');
                root.classList.add(theme);
            }
        };

        // Initialize theme from localStorage
        const savedTheme = localStorage.getItem(LocalStorageKey.THEME) as Theme | undefined;
        if (savedTheme) {
            applyTheme(savedTheme);
        }

        // Listen for storage events from other tabs
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === LocalStorageKey.THEME && e.newValue) {
                const newTheme = e.newValue as Theme;
                applyTheme(newTheme);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return null;
}

