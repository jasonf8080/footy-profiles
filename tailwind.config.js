/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {sans: ['Nunito Sans', 'sans-serif'],},
        colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "secondary-lighter-color": "var(--secondary-lighter-color)",
        "purple-color": "var(--purple-color)",
        "blue-color": "var(--blue-color)"
      },
    },
    screens: {
      xs: '320px',
      sm: '500px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
    },
  },
  plugins: [],
}

