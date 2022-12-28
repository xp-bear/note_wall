<template>
  <transition name="view">
    <div class="PhotoView" v-if="isView">
      <div class="bg"></div>
      <div class="viewer-photo">
        <video v-if="photos[nowNumber].includes('.mp4')" :src="photos[nowNumber]" autoplay loop controls class="photo-img"></video>
        <img v-else :src="photos[nowNumber]" alt="" class="photo-img" />
      </div>
      <!-- 左右两边按钮 -->
      <div class="switch sw-left" @click="changeNumber(0)" v-show="nowNumber > 0">
        <span class="iconfont icon-xiangzuo"></span>
      </div>
      <div class="switch sw-right" @click="changeNumber(1)" v-show="nowNumber < photos.length - 1">
        <span class="iconfont icon-xiangyou"></span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "PhotoView",
  data() {
    return {};
  },
  props: {
    //图片数组
    photos: {
      default: [],
    },
    //当前选择到的是那一张
    nowNumber: {
      type: Number,
      default: 0,
    },
    //图片预览组件是否展示
    isView: {
      default: false,
    },
  },
  // 左右按钮,发送到父级的事件,触发修改
  methods: {
    changeNumber(e) {
      this.$emit("viewSwitch", e);
    },
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
  z-index: 1;
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
    video {
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
//transition 组件动画特效
.view {
  //入场动画
  &-enter {
    &-from {
      opacity: 0;
    }
    &-active {
      transition: all 0.2s;
    }
    &-to {
      opacity: 1;
    }
  }
  //出场动画
  &-leave {
    &-from {
      opacity: 1;
    }
    &-active {
      transition: all 0.2s;
    }
    &-to {
      opacity: 0;
    }
  }
}
</style>
