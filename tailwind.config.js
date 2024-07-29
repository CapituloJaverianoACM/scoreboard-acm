/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme.js');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        lights: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 0.5 }
        }
      },
      colors: {
        'black-rgba': 'rgba(0, 0, 250, 0.3)',
      },
    },
  },
  plugins: [],
}

