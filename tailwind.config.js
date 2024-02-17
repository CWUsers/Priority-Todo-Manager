/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust based on your project file structure and extensions
  ],
  theme: {
    extend: {
      colors: {
        'light-mint': '#B6FFBB',
        'light-blue': '#B6FCFF'
      },
    },
  },
}

