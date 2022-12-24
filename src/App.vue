<template>
  <!-- 路由占位符  -->
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lang="less">
//脉冲动画
#animation-plus {
  -webkit-animation: plus 0.3s 0.2s ease both;
  -moz-animation: plus 0.3s 0.2s ease both;
}
#animation-reduce {
  -webkit-animation: reduce 1s 0.2s ease both;
  -moz-animation: reduce 1s 0.2s ease both;
}
@-webkit-keyframes plus {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
@-moz-keyframes reduce {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

// title-menu-min not卡片的滚动条
.title-menu-min {
  overflow-x: scroll !important;
}
.title-menu-min::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 0px;
}
.title-menu-min::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(59, 115, 240);
  background: rgba(59, 115, 240, 0.2);
}
.title-menu-min::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(59, 115, 240, 0.2);
  border-radius: 0;
  background: rgba(59, 115, 240, 0.1);
}

//模态框滚动条
.modal-slider::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 0px;
}
.modal-slider::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: #cccccc;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
.modal-slider::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  // background: #ededed;
  // border-radius: 10px;
}
* {
  margin: 0;
  padding: 0;
  block-size: border-box;
}
@import url("./assets/fonts/icon/iconfont.css"); //引入全局字体图标
// 自定义字体
@font-face {
  font-family: xp;
  // src: url("@/assets/fonts/two.ttf");
  src: url("http://cdn.xxoutman.cn/two.ttf");
}
#shade {
  font-weight: 900;
  font-size: 16px;
  color: black;
  background: -webkit-linear-gradient(right, #70f7fe, #fbd7c6, #fdefac, #bfb5dd, #bed5f5, #70f7fe);
  color: transparent;
  /*设置字体颜色透明*/
  -webkit-background-clip: text;
  /*背景裁剪为文本形式*/
  animation: ran 30s linear infinite;
  /*动态10s展示*/
}
@keyframes ran {
  from {
    backgroud-position: 0 0;
  }
  to {
    background-position: 2000px 0;
  }
}
</style>
