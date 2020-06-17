const plugins = [
  'tailwindcss',
  'postcss-preset-env'
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(['@fullhuman/postcss-purgecss', {
    content: [
      './pages/*.tsx',
      './pages/**/*.tsx',
      './components/*.tsx',
      './components/**/*.tsx',
    ],
    whitelist: ['html', 'body']
  }])
}

module.exports = {
  plugins,
}
