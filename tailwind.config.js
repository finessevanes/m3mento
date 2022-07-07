/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gradient-100': '#E9B6C7',
        'gradient-200': '#8F2A4B',
        'gradient-250': '#72223c',
        'gradient-300': '#060A1F',
        'gradient-350': '#1e2235'
      },
      height: {
        '10': '40rem',
      },
      fontSize: {
        x69: ['9rem', {
          lineHeight: '9rem',
        }],
        xTitle: ['3.5rem', {
          lineHeight: '2.8rem',
        }]
      }
    },
  },
  plugins: [],
}
