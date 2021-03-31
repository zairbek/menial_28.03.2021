const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './resources/**/*.blade.php',
    './resources/**/*.pug',
    './resources/**/*.js',
    './resources/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},

    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },

    colors: {
      current: colors.blueGray,
      white: colors.white,
      favorite: colors.pink,
      border: colors.gray,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
