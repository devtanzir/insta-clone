/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "heart-burst": {
          "0%": { opacity: "0", transform: "scale(0)" },
          "15%": { opacity: "0.9", transform: "scale(1.2)" },
          "30%": { opacity: "0.9", transform: "scale(0.9)" },
          "45%": { opacity: "0.9", transform: "scale(1)" },
          "80%": { opacity: "0.9", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(1)" },
        },
      },
      animation: {
        heart: "heart-burst 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};
