/*
    配置编译环境和线上环境之间的切换
    baseUrl：域名地址
    routerMode:路由模式
    baseImgPath：图片存放地址
 */
let baseUrl = "";
let routerMode = "hash";
let baseImgPath = null;

if (process.env.NODE_ENV == "development") {
  // 开发环境
  baseUrl = "http://150.158.21.251:8989";
  baseImgPath = "http://localhost:8989";
} else {
  // 打包环境
  baseUrl = "http://150.158.21.251:8989";
  baseImgPath = "http://cdn.xxoutman.cn";
}

export { baseUrl, routerMode, baseImgPath };
