'use client'

import { Button } from "@heroui/react";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeToggle() {
    return (
        <Button isIconOnly aria-label="Like" className="absolute top-2 right-2 rounded-full">
            <Monitor size={16} />
        </Button>
    )
}