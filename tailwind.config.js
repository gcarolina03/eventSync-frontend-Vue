/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#483EB1',
        secondary: '#7369DC',
        light: '#7369DC',
        dark: '#312a82',
        text: '#150D2C',
      },
    },
  },
  plugins: [],
}

