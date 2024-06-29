const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint代码检查
  lintOnSave:false,
  // 配置代理服务器,解决跨域问题
  devServer:{
    proxy:{
      '/api':{
        // 服务器地址
        target:"http://sph-h5-api.atguigu.cn",
        // 路径重写，去掉/api
        // pathRewrite:{'^/api':''}
      }
    }
  }
})
