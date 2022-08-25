module.exports = {
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    // 关闭名称校验
    "vue/multi-word-component-names": "off",
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
};
