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
  }
}
