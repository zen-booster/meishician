/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'main-01': '#2B5F75',
        'main-02': '#A8D8B9',
        'main-03': '#268785',
        danger: '#E3265F',
        success: '#26E39F',
        highlight: '#F4A7B9',
      },
    },
  },
  plugins: [],
};
