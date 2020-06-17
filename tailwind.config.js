module.exports = {
  purge: [
    './pages/*.tsx',
    './pages/**/*.tsx',
    './components/*.tsx',
    './components/**/*.tsx',
  ],
  theme: {
    extend: {
      margin: {
        'xxs': '4px',
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '24px',
        'xl': '32px',
      },
      padding: {
        'xxs': '4px',
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '24px',
        'xl': '32px',
      },
    },
  },
  variants: {},
  plugins: [],
}
