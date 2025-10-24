import { heroui } from "@heroui/react";

export default heroui({
    prefix: "heroui",
    addCommonColors: false,
    defaultTheme: "light",
    defaultExtendTheme: "light",
    themes: {
        light: {
            layout: {},
            colors: {
                background: "#efefef",
                foreground: "#11181C"
            },
        },
        dark: {
            layout: {},
            colors: {
                background: "#000000",
                foreground: "#ECEDEE"
            },
        }
    },
});