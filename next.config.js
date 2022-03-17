/** @type {import('next').NextConfig} */

const withLess = require('next-with-less')

module.exports = withLess({
  // reactStrictMode: true,
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
})
