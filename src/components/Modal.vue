<template>
  <transition name="animate-modal">
    <div class="Modal" v-if="idModal">
      <!-- 模态框头部 -->
      <div class="modal-head">
        <p class="modal-name">{{ title }}</p>
        <span class="iconfont icon-guanbi" @click="closeModal()"></span>
      </div>
      <!-- 模态框内容部分 -->
      <div class="modal-main modal-slider">
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
    //模态框的显示与隐藏,默认值是false
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
  z-index: 99;
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
      font-family: "xp";
      color: #202020;
      font-weight: 600;
    }
    span {
      font-size: 18px;
      padding: 0px 5px; //增加按钮的可选域
      transform: rotate(0deg);
      transition: all 0.3s;
      &:hover {
        color: red;
        transform: rotate(180deg);
        font-weight: 700;
      }
    }
  }
  .modal-main {
    height: 100%;
    padding: 0 18px;
    overflow-y: auto;
    margin: 2px;
    .slide {
      height: 1200px;
      // background-color: red;
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
</style>
