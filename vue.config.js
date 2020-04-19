const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

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
  }
}
