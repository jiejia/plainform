import {heroui} from "@heroui/react";

export default heroui({
    prefix: "heroui",
    addCommonColors: false,
    defaultTheme: "light",
    defaultExtendTheme: "light",
    layout: {
        disabledOpacity: "0.3", // opacity-[0.3]
        radius: {
            small: "2px", // rounded-small
            medium: "4px", // rounded-medium
            large: "6px", // rounded-large
        },
        borderWidth: {
            small: "1px", // border-small
            medium: "1px", // border-medium
            large: "2px", // border-large
        },
    },
    themes: {
        light: {
            layout: {},
            colors: {
                background: "#f3f3f3",
                foreground: "#171717",
                primary: {
                    50: "#efe5ff",
                    100: "#d0b3ff",
                    200: "#b080ff",
                    300: "#914dff",
                    400: "#711aff",
                    500: "#5800e6",
                    600: "#4400b3",
                    700: "#310080",
                    800: "#1d004d",
                    900: "#0a001a",
                    DEFAULT: "#5800e6",
                    foreground: "#ffffff",
                },
                secondary: {500: "#64748B", 600: "#475569", DEFAULT: "#64748B", foreground: "#ffffff"},
                success: {500: "#22C55E", 600: "#16A34A", DEFAULT: "#22C55E", foreground: "#052E16"},
                warning: {500: "#F59E0B", 600: "#D97706", DEFAULT: "#F59E0B", foreground: "#111827"},
                danger: {500: "#EF4444", 600: "#DC2626", DEFAULT: "#EF4444", foreground: "#ffffff"},
                focus: "#ffffff",
            },
        },
        dark: {
            layout: {},
            colors: {
                background: "#0b0b0b",
                foreground: "#006fee",
                primary: {
                    50: "#efe5ff",
                    100: "#d0b3ff",
                    200: "#b080ff",
                    300: "#914dff",
                    400: "#711aff",
                    500: "#5800e6",
                    600: "#4400b3",
                    700: "#310080",
                    800: "#1d004d",
                    900: "#0a001a",
                    DEFAULT: "#5800e6",
                    foreground: "#ffffff",
                },
                secondary: {500: "#64748B", 600: "#475569", DEFAULT: "#64748B", foreground: "#ffffff"},
                success: {500: "#22C55E", 600: "#16A34A", DEFAULT: "#22C55E", foreground: "#052E16"},
                warning: {500: "#F59E0B", 600: "#D97706", DEFAULT: "#F59E0B", foreground: "#111827"},
                danger: {500: "#EF4444", 600: "#DC2626", DEFAULT: "#EF4444", foreground: "#ffffff"},
                focus: "#A78BFA",
            },
        },

        // 新增主题：yellow
        yellow: {
            layout: {},
            colors: {
                background: "#f3f3f3",
                foreground: "#171717",
                primary: {
                    50: "#FEFCE8",
                    100: "#FEF9C3",
                    200: "#FEF08A",
                    300: "#FDE047",
                    400: "#FACC15",
                    500: "#EAB308",
                    600: "#CA8A04",
                    700: "#A16207",
                    800: "#854D0E",
                    900: "#713F12",
                    DEFAULT: "#EAB308",
                    foreground: "#111827",
                },
                secondary: {500: "#64748B", 600: "#475569", DEFAULT: "#64748B", foreground: "#ffffff"},
                success: {500: "#22C55E", 600: "#16A34A", DEFAULT: "#22C55E", foreground: "#052E16"},
                warning: {500: "#F59E0B", 600: "#D97706", DEFAULT: "#F59E0B", foreground: "#111827"},
                danger: {500: "#EF4444", 600: "#DC2626", DEFAULT: "#EF4444", foreground: "#ffffff"},
                focus: "#A78BFA",
            },
        },

        // 新增主题：orange
        orange: {
            layout: {},
            colors: {
                background: "#f3f3f3",
                foreground: "#171717",
                primary: {
                    50: "#FFF7ED",
                    100: "#FFEDD5",
                    200: "#FED7AA",
                    300: "#FDBA74",
                    400: "#FB923C",
                    500: "#F97316",
                    600: "#EA580C",
                    700: "#C2410C",
                    800: "#9A3412",
                    900: "#7C2D12",
                    DEFAULT: "#F97316",
                    foreground: "#111827",
                },
                secondary: {500: "#64748B", 600: "#475569", DEFAULT: "#64748B", foreground: "#ffffff"},
                success: {500: "#22C55E", 600: "#16A34A", DEFAULT: "#22C55E", foreground: "#052E16"},
                warning: {500: "#F59E0B", 600: "#D97706", DEFAULT: "#F59E0B", foreground: "#111827"},
                danger: {500: "#EF4444", 600: "#DC2626", DEFAULT: "#EF4444", foreground: "#ffffff"},
                focus: "#A78BFA",
            },
        },

        // 新增主题：green
        green: {
            layout: {},
            colors: {
                background: "#f3f3f3",
                foreground: "#171717",
                primary: {
                    50: "#F0FDF4",
                    100: "#DCFCE7",
                    200: "#BBF7D0",
                    300: "#86EFAC",
                    400: "#4ADE80",
                    500: "#22C55E",
                    600: "#16A34A",
                    700: "#15803D",
                    800: "#166534",
                    900: "#14532D",
                    DEFAULT: "#22C55E",
                    foreground: "#052E16",
                },
                secondary: {500: "#64748B", 600: "#475569", DEFAULT: "#64748B", foreground: "#ffffff"},
                success: {500: "#22C55E", 600: "#16A34A", DEFAULT: "#22C55E", foreground: "#052E16"},
                warning: {500: "#F59E0B", 600: "#D97706", DEFAULT: "#F59E0B", foreground: "#111827"},
                danger: {500: "#EF4444", 600: "#DC2626", DEFAULT: "#EF4444", foreground: "#ffffff"},
                focus: "#A78BFA",
            },
        },

        // 新增主题：blue
        blue: {
            layout: {},
            colors: {
                background: "#f3f3f3",
                foreground: "#171717",
                primary: {
                    50: "#EFF6FF",
                    100: "#DBEAFE",
                    200: "#BFDBFE",
                    300: "#93C5FD",
                    400: "#60A5FA",
                    500: "#3B82F6",
                    600: "#2563EB",
                    700: "#1D4ED8",
                    800: "#1E40AF",
                    900: "#1E3A8A",
                    DEFAULT: "#3B82F6",
                    foreground: "#ffffff",
                },
                secondary: {500: "#64748B", 600: "#475569", DEFAULT: "#64748B", foreground: "#ffffff"},
                success: {500: "#22C55E", 600: "#16A34A", DEFAULT: "#22C55E", foreground: "#052E16"},
                warning: {500: "#F59E0B", 600: "#D97706", DEFAULT: "#F59E0B", foreground: "#111827"},
                danger: {500: "#EF4444", 600: "#DC2626", DEFAULT: "#EF4444", foreground: "#ffffff"},
                focus: "#A78BFA",
            },
        },
    },
});