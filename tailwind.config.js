/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0B0C0E',
        primary: '#AFB9C0',
        secondary: '#4E5165',
      },
    },
  },
  plugins: [],
};
