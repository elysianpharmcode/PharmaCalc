/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#043873',
          light: '#0a4a8a',
          lighter: '#1a5fa0',
          dark: '#032b5a',
        },
        blue: {
          DEFAULT: '#4F9CF9',
          50: '#EBF3FE',
          100: '#C4DEFD',
          200: '#A1C9FC',
          300: '#7EB4FA',
          400: '#4F9CF9',
          500: '#4F9CF9',
          600: '#2B7FE0',
          700: '#1A65B8',
          800: '#0F4A8A',
        },
        gold: {
          DEFAULT: '#FFE492',
          dark: '#FFD966',
          light: '#FFF0C4',
        },
        dark: '#212529',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
