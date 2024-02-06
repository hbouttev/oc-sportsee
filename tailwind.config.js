/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'charts-red': '#E60000',
        'charts-black': '#282D30',
        'charts-primary': '#74798C',
        'charts-title': '#20253A',
      },
    },
  },
  plugins: [],
};
