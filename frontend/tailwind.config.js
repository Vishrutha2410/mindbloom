/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bloom: { green:'#6BCB77', lavender:'#A78BFA', blue:'#93C5FD', pink:'#F9A8D4', soft:'#F0FDF4' }
      },
      fontFamily: { sans: ['Inter','sans-serif'] },
    },
  },
  plugins: [],
};
