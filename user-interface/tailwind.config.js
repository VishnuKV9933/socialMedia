/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "dark-purple":"#081A51",
        "light_white":"rgba(255,255,255,0.17)",
        "socialBg":"#F5F7FB",
        "socialBlue":"#218DFA"
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      width: {
        'w25':'25%',
        'w23':'22%',
        'w13':'13%',
        'w60':'60%'
      }, 
      fontSize: {
        "ssm": '0.4rem',
      }
    },
  },
  plugins: [],
}
