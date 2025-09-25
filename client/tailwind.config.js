/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2563eb',
        'primary-dull': '#1f58d8',
        'light': '#f1f5f9',
        'border-color': '#c4c7d2', // Corrected name
      }
    },
  },
  plugins: [],
}