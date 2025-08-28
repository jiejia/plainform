'use client'

import { addToast, cn } from "@heroui/react";

export function msg(title: string, description: string, color: 'default' | 'foreground' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | undefined = 'warning') {
    addToast({
        title: title,
        description: description,
        color: color,
        classNames: {
            base: cn([
              "bg-default-50 dark:bg-background shadow-sm",
              "border border-l-8 rounded-md rounded-l-none",
              "flex flex-col items-start",
              "border-primary-200 dark:border-primary-100 border-l-primary",
            ]),
            icon: "w-6 h-6 fill-current",
          },
        timeout: 3000,
    });
}