/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffa49b',
        'primary-variant': '#ffdbd7',
        'primary-hover': '#f28174',
        secondary: '#9bb4ff',
        'secondary-hover': '#6f93ff',
        error: '#FF0000',
        background: '#252836',
        'item-background': '#1F1D2B',
        'login-btn': '#4044ED',
        'register-btn': '#656ED3',
      },
      fontFamily: {
        // 'jk-abode': ['Regular Demo', 'sans-serif'],
        // 'baloo-bhaijaan': ['Regular', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        'baloo-bhaijaan': ['Baloo Bhaijaan 2', 'cursive'],
      },
      fontSize: {
        'main-item': '15px',
        'secondary-size': '12px',
      },
    },
  },
  plugins: [],
};
