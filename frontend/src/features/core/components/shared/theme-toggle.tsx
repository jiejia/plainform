'use client'

import { Button } from "@heroui/react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from 'next-themes'

export default function ThemeToggle({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    // Avoid hydration mismatch by not rendering until mounted
    if (!mounted) {
        return (
            <Button 
                isIconOnly 
                aria-label="Toggle theme" 
                className={`rounded-full ${className || ''}`}
                size="sm"
                disabled
            >
                <Monitor size={16} />
            </Button>
        );
    }

    const handleThemeToggle = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else if (theme === 'dark') {
            setTheme('system');
        } else {
            setTheme('light');
        }
    };

    return (
        <Button 
            isIconOnly 
            aria-label="Toggle theme" 
            className={`rounded-full ${className || ''}`} 
            onClick={handleThemeToggle}
            size="sm"
        >
            {theme === 'system' ? <Monitor size={16} /> : theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
        </Button>
    );
}