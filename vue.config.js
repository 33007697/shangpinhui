const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 清除打包时map文件，该文件是为了项目报错时，可以正确的找到错误的代码位置，当项目上线时，不需要该文件可以删除
  // 需要配置:productionSourceMap：false    //如此项目打包时就不会生成map文件
  // productionSourceMap:false,
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
