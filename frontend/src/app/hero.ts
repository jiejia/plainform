import { heroui } from "@heroui/react";

export default heroui({
    prefix: "heroui",
    addCommonColors: false,
    defaultTheme: "dark",
    defaultExtendTheme: "dark",
    layout: {
        disabledOpacity: "0.3", // opacity-[0.3]
        radius: {
            small: "4px", // rounded-small
            medium: "6px", // rounded-medium
            large: "8px", // rounded-large
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
                secondary: { 500: "#64748B", 600: "#475569", DEFAULT: "#64748B", foreground: "#ffffff" },
                success: { 500: "#22C55E", 600: "#16A34A", DEFAULT: "#22C55E", foreground: "#052E16" },
                warning: { 500: "#F59E0B", 600: "#D97706", DEFAULT: "#F59E0B", foreground: "#111827" },
                danger: { 500: "#EF4444", 600: "#DC2626", DEFAULT: "#EF4444", foreground: "#ffffff" },
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
                secondary: { 500: "#64748B", 600: "#475569", DEFAULT: "#64748B", foreground: "#ffffff" },
                success: { 500: "#22C55E", 600: "#16A34A", DEFAULT: "#22C55E", foreground: "#052E16" },
                warning: { 500: "#F59E0B", 600: "#D97706", DEFAULT: "#F59E0B", foreground: "#111827" },
                danger: { 500: "#EF4444", 600: "#DC2626", DEFAULT: "#EF4444", foreground: "#ffffff" },
                focus: "#A78BFA",
            },
        }
    },
});