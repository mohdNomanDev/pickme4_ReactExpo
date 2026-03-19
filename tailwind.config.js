/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./services/**/*.{js,jsx,ts,tsx}",
    "./store/**/*.{js,jsx,ts,tsx}",
    "./utils/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "primary": {
          DEFAULT: "#f27f0d",
          foreground: "#ffffff",
        },
        "background": {
          DEFAULT: "#f8f7f5",
          dark: "#0a0a0a",
        },
        "card": {
          DEFAULT: "#ffffff",
          dark: "#141414",
        },
        "text": {
          DEFAULT: "#1a1a1a",
          muted: "#6b7280",
          dark: "#f8f7f5",
          "muted-dark": "#9ca3af",
        },
        "border": {
          DEFAULT: "#e5e7eb",
          dark: "#262626",
        }
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"]
      },
    },
  },
  plugins: [],
};
