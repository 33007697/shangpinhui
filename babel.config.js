module.exports = {
  "presets": [
    '@vue/cli-plugin-babel/preset'
  ],
  // ElementUI按需加载配置
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
