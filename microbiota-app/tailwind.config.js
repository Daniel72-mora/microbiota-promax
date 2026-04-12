/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Esta línea es la que "prende" los estilos en App.jsx
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}