// tailwind.config.js
import { heroui } from "@heroui/react";
import tailwindScrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
    },
  },
  darkMode: "class",
  plugins: [],
};