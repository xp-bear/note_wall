const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //关闭eslint检查
});

module.exports = {
  transpileDependencies: true,
  lintOnSave: false, //关闭eslint检查
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/styles/common.less")], // 引入全局less样式变量
    },
  },
};
