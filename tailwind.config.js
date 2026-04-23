/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 20px 45px -20px rgba(15, 23, 42, 0.35)',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at top, rgba(59, 130, 246, 0.08), transparent 35%)',
      },
    },
  },
  plugins: [],
}

