/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6EF',
        creamdark: '#F3EDE2',
        ink: '#1C1917',
        clay: {
          DEFAULT: '#B0512F',
          dark: '#8F3F22',
          soft: '#F5E4D8',
        },
        pastel: {
          sage: '#DDE8D6',
          blush: '#F6DED6',
          sky: '#DCE6F1',
          butter: '#F3E8C6',
        },
      },
      fontFamily: {
        display: ['Archivo', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
