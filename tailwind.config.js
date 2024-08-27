/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ff1d46", // New highlight color for buttons and important components
        },
        secondary: {
          DEFAULT: "#444444", // New color for accents and dark theme background
        },
        tertiary: {
          DEFAULT: "#d9d9d9", // New color for chat bubbles, side menu, etc.
        },
        quaternary: {
          DEFAULT: "#eee9ea", // New color for cards, etc.
        },
        background: {
          light: "#efefef", // New light theme background color
          dark: "#444444", // New dark theme background color (same as secondary)
        },
        text: {
          light: "#000000", // Using secondary color for light mode text
          DEFAULT: "#000000", // Using secondary color for default text
          dark: "#ffffff", // Using light background color for dark mode text
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
