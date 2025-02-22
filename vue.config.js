const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule('postcss')
      .oneOf('vue')
      .use('postcss-loader')
      .loader('postcss-loader')
      .tap((options) => {
        // 确保 options.plugins 已经初始化为一个数组
        if (!options.plugins) {
          options.plugins = [];
        }

        // 添加 postcss-px-to-viewport 插件
        options.plugins.push(
          require('postcss-px-to-viewport-8-plugin')({
            viewportWidth: 375, // 设计稿宽度
            unitPrecision: 5, // 转换后的精度
            viewportUnit: 'vw', // 使用的单位
            selectorBlackList: ['.ignore'], // 忽略转换的类名
            minPixelValue: 1, // 小于等于1px的px不转换
            mediaQuery: false, // 是否在媒体查询中转换px
          })
        );
        return options;
      });
  },
})
