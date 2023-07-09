/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'box':'0px 5px 15px rgba(0, 0, 0, 0.35)'
      }
    },
  },
  plugins: [],
}