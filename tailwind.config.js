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
      fontSize: {
        'xs': '0.5rem', // 8px
        'sm': '0.625rem', // 10px
        'base': '0.75rem', // 12px
        'lg': '0.875rem', // 14px
        'xl': '1rem', // 16px
        '2xl': '1.125rem', // 18px
        '3xl': '1.25rem', // 20px
        '4xl': '1.5rem', // 24px
        '5xl': '1.875rem', // 30px
      },
    },
  },
  plugins: [],
}

