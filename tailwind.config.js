/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
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
          dark: "#121212",
        },
        "card": {
          DEFAULT: "#ffffff",
          dark: "#1e1e1e",
        },
        "text": {
          DEFAULT: "#1a1a1a",
          dark: "#f8f7f5",
        }
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"]
      },
    },
  },
  plugins: [],
};
