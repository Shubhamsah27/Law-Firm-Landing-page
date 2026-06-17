/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        firmBg: '#0A0A0F',
        firmSurface: '#12121E',
        firmText: '#F5F1EA',
        firmMuted: '#A7A39A',
        firmGold: '#C9A84C',
        firmGoldDeep: '#9F7F2F',
        firmBorder: 'rgba(201,168,76,0.15)',
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        none: '0px',
      },
    },
  },
  plugins: [],
}
