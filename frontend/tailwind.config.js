/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
      primary: "#6C63FF",   // main purple
      primaryLight: "#8a82ff",
      bg: "#eeeeff",        // soft white-blue surface
    },

    },
  },
  plugins: [],
};
