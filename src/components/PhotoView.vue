<template>
  <div class="PhotoView">
    <div class="bg"></div>
    <div class="viewer-photo">
      <img :src="require('../../static/4.jpg')" alt="" class="photo-img" />
    </div>
    <!-- 左右两边按钮 -->
    <div class="switch sw-left">
      <span class="iconfont icon-xiangzuo"></span>
    </div>
    <div class="switch sw-right">
      <span class="iconfont icon-xiangyou"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotoView",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.PhotoView {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .bg {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
  }
  .viewer-photo {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-right: 456px;
    padding-top: 82px;
    padding-left: 96px;
    padding-bottom: 30px;
    overflow: auto;
    text-align: center;
    img {
      display: inline-block;
      max-width: 100%;
    }
  }
  .switch {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #949494;
    color: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.3s;
    &:hover {
      opacity: 1;
    }
    span {
      font-size: 24px;
    }
  }
  .sw-left {
    left: 20px;
  }
  .sw-right {
    right: 380px;
  }
}
</style>
