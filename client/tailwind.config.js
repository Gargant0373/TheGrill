/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: {
          light: "#ff667b",
          DEFAULT: "#f60820",
          dark: "#aa0617",
        },
        green: {
          light: "#96ce2f",
          DEFAULT: "#70ae03",
          dark: "#4a7302",
        },
        blue: {
          light: "#2fc9e0",
          DEFAULT: "#0197af",
          dark: "#016678",
        },
        beige: {
          light: "#f6e8d8",
          DEFAULT: "#f2e3d0",
          dark: "#bfae9f",
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
        ishmeria: ['"Ishmeria"', "serif"],
      },
    },
  },
  plugins: [],
};
