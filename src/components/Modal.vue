<template>
  <div class="Modal" v-if="idModal">
    <!-- 模态框头部 -->
    <div class="modal-head">
      <p class="modal-name">{{ title }}</p>
      <span class="iconfont icon-guanbi" @click="closeModal()"></span>
    </div>
    <slot></slot>
  </div>
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
  padding: 20px;
  box-sizing: border-box;
  .modal-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
}
</style>
