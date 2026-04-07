/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          light: "#8ab468",
          dark: "#0c5454",
          darkest: "#083838",
        },
        yellow: {
          light: "#fbe2a0",
          DEFAULT: "#f5c12d",
          dark: "#cc9a1f",
          surface: "#f7edd4",
          paper: "#f9f6ee",
        },
        purple: {
          light: "#d979a2",
          DEFAULT: "#b25085",
          dark: "#6f2d54",
        },
      },
      keyframes: {
        windowOpen: {
          from: {
            opacity: "0",
            transform: "scale(0.97)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        windowClose: {
          from: {
            opacity: "1",
            transform: "scale(1)",
          },
          to: {
            opacity: "0",
            transform: "scale(0.96)",
          },
        },
      },
      animation: {
        "window-open": "windowOpen 240ms cubic-bezier(0.1, 0.9, 0.2, 1) both",
        "window-close": "windowClose 160ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards",
      },
      fontFamily: {
        sans: ['"Retro Wild"', "Trebuchet MS", "Segoe UI", "sans-serif"],
        title: ['"Bellybeans"', '"Retro Wild"', "Trebuchet MS", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
