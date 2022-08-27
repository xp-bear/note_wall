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
</style>
