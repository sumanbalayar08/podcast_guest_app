/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',   // App Router folders
    './pages/**/*.{js,ts,jsx,tsx}', // (if you still have /pages)
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pumpkin: {
          50:  '#fff6ed',
          100: '#ffe4c3',
          200: '#ffc08a',
          300: '#ff9b4a',
          400: '#ff7c1d',
          500: '#ff7518',   
          600: '#d15f15',
          700: '#9c460f',
          800: '#66300a',
          900: '#331805',
        },
        teal: '#008080',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
