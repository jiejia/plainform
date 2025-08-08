// tailwind.config.js
import { heroui } from "@heroui/react";
import tailwindScrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {

        }
    },
  },
  darkMode: "class",
  plugins: [heroui(), tailwindScrollbar],
};