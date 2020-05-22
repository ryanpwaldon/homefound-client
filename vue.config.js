const path = require('path')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const PrerenderSpaPlugin = require('prerender-spa-plugin')

module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 8081
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import '@/assets/css/breakpoints/breakpoints.scss';
        `
      }
    }
  },
  chainWebpack: config => {
    config
      .module
      .rule('markdown')
      .test(/\.md$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
    config
      .plugin('favicons')
      .use(FaviconsWebpackPlugin, [{ logo: './src/assets/img/favicon.svg' }])
    process.NODE_ENV === 'production' && config
      .plugin('prerender-spa-plugin')
      .use(PrerenderSpaPlugin, [{
        staticDir: path.join(__dirname, 'dist'),
        routes: [
          '/',
          '/agents',
          '/pricing/buyer',
          '/pricing/agent',
          '/login',
          '/signup/buyer',
          '/signup/agent',
          '/terms',
          '/privacy'
        ]
      }])
  }
}
