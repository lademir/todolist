
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      "primaryColor": "#43e97a",
      "lightBlue": colors.sky,
      "warmGray": colors.stone,
      "trueGray": colors.neutral,
      "coolGray": colors.gray,
      "blueGray": colors.slate,
    }
  },
  plugins: [],
}
