module.exports = {
  html: {
    template: 'src/index.html'
  },
  webpack (config) {
    config.module.rules.push({
      test: /\.code$/,
      use: [{ loader: 'raw-loader' }]
    })
    return config
  }
}
