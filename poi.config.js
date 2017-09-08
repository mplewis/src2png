module.exports = {
  html: {
    template: 'src/index.html'
  },
  webpack (config) {
    config.module.rules.push({
      test: /\.(code|path)$/,
      use: [{ loader: 'raw-loader' }]
    })
    return config
  }
}
