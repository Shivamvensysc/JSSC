/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#004638",
          dark: "#00382D",
          light: "#0B5A49",
        },

        text: {
          primary: "#FFFFFF",
          secondary: "#D5E5DF",
          muted: "#E4F1ED",
        },

        border: {
          primary: "#2B6C60",
        },
      },
    },
  },
  plugins: [],
};
