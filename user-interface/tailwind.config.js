/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      extend: {
        maxWidth: {
          '1': '50px',
          '4': '40%',
        }
      },

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
        'w20':'20%',
        'w25':'25%',
        'w27':'27%',
        'w30':'30%',
        'w23':'22%',
        'w13':'13%',
        'w60':'60%',
        'w50':'50%',
        'w80':'80%',
        'w85':'85%',
        'w90':'90%',
        'w95':'95%',
        'w97':'97%',
        'w98':'98%',
      }, 
      fontSize: {
        "ssm": '0.7rem',
      }
    },
  },
  plugins: [],
}
