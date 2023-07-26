const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  configureWebpack: config => {
    config.plugins.push(AutoImport({
      resolvers: [ElementPlusResolver()]
    }));
    config.plugins.push(Components({
      resolvers: [ElementPlusResolver()]
    }));
  },
  devServer: {
    https: false,
    hot: false,
    proxy: {
      '/api': {
        target: 'https://6d17-106-81-248-49.ngrok.io/',
        // 
        changeOrigin: true,
        // 
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
