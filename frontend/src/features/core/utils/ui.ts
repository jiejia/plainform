'use client'

import { addToast, cn } from "@heroui/react";

export function msg(title: string, description: string, color: 'default' | 'foreground' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | undefined = 'warning') {
    addToast({
        title: title,
        description: description,
        color: color,
        classNames: {
            base: cn([
              "bg-content1 dark:bg-content4 shadow-sm",
              "border border-2  rounded-3xl",
              "flex flex-col items-start",
              "border-primary-200 dark:border-primary-100",
            ]),
            icon: "w-6 h-6 fill-current",
          },
        timeout: 3000,
    });
}