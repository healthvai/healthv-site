/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // HealthV.ai brand accents (matches the rest of the site's --accent)
        brand: {
          50:  '#eef9f7',
          100: '#d2efe9',
          200: '#a8e2d6',
          300: '#82d8c8',
          400: '#5ed3c0',
          500: '#3dbfa8',
          600: '#2ba691',
          700: '#208473',
        },
      },
    },
  },
  plugins: [],
};
