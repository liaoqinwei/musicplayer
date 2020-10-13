module.exports = {
  publicPath:'/player/',
  configureWebpack:{
    resolve:{
      alias:{
        assets:'@/assets',
        common:'@/common',
        components:'@/components',
        network:'@/network',
        views:'@/views',
        mixins:'@/mixins'
      }
    }
  }
}