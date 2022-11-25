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
    fontSize: {
      h1: ['32px', '56px'],
      h2: ['60px', '80px'],
      h3: ['44px', '125%'],
      h4: ['32px', '132%'],
      h5: ['24px', '32px'],
      'fs-6': ['20px', '32px'],
      body: ['18px', '160%'],
      highlight: ['24px', '140%'],
      'rwd-h1': ['20px', '125%'],
      'rwd-h2': ['28px', '125%'],
      'rwd-h3': ['24px', '140%'],
      'rwd-h4': ['20px', '140%'],
      'rwd-h5': ['18px', '140$'],
      'rwd-body': ['16px', '160%'],
      'rwd-highlight': ['18px', '140%'],
      label: ['12px', '160%'],
    },
  },
  plugins: [],
};
