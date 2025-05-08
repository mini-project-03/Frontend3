/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#1AE273',
          200: '#A3F5C7',
        },
        secondary: {
          600: '#333333',
          500: '#606060',
          200: '#E7BEEE',
        },
      },
    },
  },
  plugins: [],
};
