<template>
  <transition name="animate-modal">
    <div class="Modal" v-if="idModal">
      <!-- 模态框头部 -->
      <div class="modal-head">
        <p class="modal-name">{{ title }}</p>
        <span class="iconfont icon-guanbi" @click="closeModal()"></span>
      </div>
      <div class="modal-main modal-slider">
        <div class="slide">12</div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits, onMounted } from "vue";
const props = defineProps({
  title: {
    default: "标题",
  },
  idModal: {
    //模态框的显示与隐藏
    default: false,
  },
});
const emit = defineEmits(["close"]);

function closeModal() {
  emit("close", "我是关闭");
}
// onMounted(closeModal);
</script>

<style lang="less" scoped>
.Modal {
  width: 360px;
  height: 100%;
  position: fixed;
  right: 0;
  top: 52px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(20px);
  .modal-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    .modal-name {
      font-size: 16px;
      color: #202020;
      font-weight: 600;
    }
    span {
      font-size: 16px;
      padding: 0px 5px; //增加按钮的可选域
    }
  }
  .modal-main {
    height: 100%;
    padding: 0 18px;
    overflow-y: auto;
    margin: 2px;
    .slide {
      height: 1200px;
      background-color: #ccc;
    }
  }
}
//transition 组件动画特效
.animate-modal {
  //入场动画
  &-enter {
    &-from {
      transform: translateX(360px);
    }
    &-active {
      transition: all 0.3s;
    }
    &-to {
      transform: translateX(0px);
    }
  }
  //出场动画
  &-leave {
    &-from {
      transform: translateX(0px);
    }
    &-active {
      transition: all 0.3s;
    }
    &-to {
      transform: translateX(360px);
    }
  }
}
//滚动条
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
</style>
