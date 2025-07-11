/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      fontFamily: {
        geist: ['Geist', 'sans-serif']
      }
    },
  },
  plugins: [],
}
