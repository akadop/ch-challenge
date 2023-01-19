const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  // remove unused styles in production
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './src/styles/*.css'],
  theme: {
    fontFamily: {
      display: ['Nunito'],
      body: ['Nunito', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        eggshell: '#F2EFE4'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/typography'), require('@tailwindcss/forms')]
}
