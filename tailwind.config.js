
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      "primaryColor": "#43e97a",
      "blue": colors.blue,
      "lightBlue": colors.sky,
      "red": colors.red,
      "black": colors.black,
      "gray": colors.gray,
      "lightGray": colors.slate,
      "green": colors.green
    }
  },
  plugins: [],
}
