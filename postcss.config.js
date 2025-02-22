module.exports = {
    plugins: {
      'postcss-px-to-viewport-8-plugin': {
        viewportWidth: 375, // 设计稿的宽度（通常为375px，iPhone 6的宽度）
        // viewportHeight: 768, // 设计稿的高度
        unitPrecision: 5, // 转换后的精度，即小数点后保留几位
        viewportUnit: 'vw', // 使用的单位，建议使用 vw 单位
        selectorBlackList: ['.ignore', '.hairlines'], // 忽略转换的类名
        minPixelValue: 1, // 小于或等于1px的值不进行转换
        mediaQuery: false, // 是否允许在媒体查询中转换px
      },
    },
  };
  