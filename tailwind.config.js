/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx,.txt}"],
  theme: {
    container: {},
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      colors: {
        background: "#0a0f1e",
        foreground: "#f0f6ff",

        card: {
          DEFAULT: "#131a30",
          foreground: "#f0f6ff",
        },

        popover: {
          DEFAULT: "#131a30",
          foreground: "#f0f6ff",
        },

        primary: {
          DEFAULT: "#1c3d73",
          foreground: "#ffffff",
        },

        secondary: {
          DEFAULT: "#ffbf00",
          foreground: "#000",
        },

        muted: {
          DEFAULT: "#a6a9b3",
          foreground: "#1c3d73",
        },

        accent: {
          DEFAULT: "#0e1b33",
          foreground: "#ffbf00",
        },

        destructive: {
          DEFAULT: "#d72638",
          foreground: "#fff",
        },

        border: "#4f576f",
        input: "#16243d",
        ring: "#ffbf00",

        chart: {
          1: "#1c3d73",
          2: "#ffbf00",
          3: "#d72638",
          4: "#a6a9b3",
          5: "#0e1b33",
        },

        sidebar: {
          DEFAULT: "#0e1b33",
          foreground: "#f0f6ff",
          primary: "#1c3d73",
          "primary-foreground": "#ffffff",
          accent: "#ffbf00",
          "accent-foreground": "#000",
          border: "#4f576f",
          ring: "#ffbf00",
        },

        shadow: "0 8px 16px rgba(10, 15, 30, 0.5)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
