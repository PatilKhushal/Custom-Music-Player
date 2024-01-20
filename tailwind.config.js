/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {},
    screens: {
      'TV': {'max': '2560px'},
      
      'large-desktop': {'max': '1600px'},

      'mid-desktop': {'max': '1200px'},

      'small-desktop': {'max': '1024px'},

      'tablet': {'max': '768px'},

      'small-tablet': {'max': '640px'},
      
      'large-mobile': {'max': '450px'},
      
      'mid-mobile': {'max': '375px'},

      'small-mobile': {'max': '325px'},
    }
  },
  plugins: [],
}

