/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsla(5000, 100%, 65%,1)',
        primaryLight: 'hsla(52112, 100%, 70%,1)',
        primaryDark: 'hsla(52112, 100%, 25%,1)',
      },
    },
  },
  plugins: [],
};
