/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          darkest: '#0b1a3a',
          dark: '#162d50',
          base: '#1b3864',
          light: '#2f5b7a',
          accent: '#4a6e8a',
          soft: '#d8e2f0',
        },
        neutral: {
          bg: '#f7f8fb',
          border: '#dcd8cf',
          textDark: '#2b2a27',
          textMuted: '#706e65',
        }
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
