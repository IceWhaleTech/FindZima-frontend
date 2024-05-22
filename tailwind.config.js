const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}', // 根据你的项目结构调整
  ],
  theme: {
    fontFamily: {
      sans: ['"BrittiSans"', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      borderColor:{
        DEFAULT:'#DCDCDC'
      },
      colors:{
        primary: '#0057FF',
        fontLow: '#6B6B6B',
      },
      textColor:{
        DEFAULT:'#1a1a1a'
      }
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        'a': {
          color: theme('colors.primary'),
          cursor:'pointer',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      });
    },
  ],
}

