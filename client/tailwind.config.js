/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      primary: "#002b44",
      secondary: "#0000ff"
    },
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}