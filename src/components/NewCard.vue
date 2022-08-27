<template>
  <div class="NewCard">
    <!-- 颜色选择列表 -->
    <div class="colors">
      <p class="color-li" v-for="(item, index) in cardListColor" :key="index" :style="{ background: item }" :class="{ color_selected: index == selectedColor }" @click="selectColor(index)"></p>
    </div>
    <!-- 新建卡片 -->
    <div class="card-main">
      <textarea placeholder="留言..." class="message title-menu-min" ref="textarea"></textarea>
      <input type="text" placeholder="签名..." class="name" />
    </div>
  </div>
</template>

<script>
import { cardListColor } from "@/utils/data";
export default {
  name: "NewCard",
  props: {},
  mounted() {
    this.$refs.textarea.focus(); //文本域聚焦
  },
  data() {
    return {
      cardListColor,
      selectedColor: 0, //卡片颜色选择序号
    };
  },
  methods: {
    // 卡片颜色选择序号函数
    selectColor(index) {
      this.selectedColor = index;
    },
  },
};
</script>

<style lang="less" scoped>
.NewCard {
  .colors {
    height: 36px;
    .color-li {
      width: 24px;
      height: 24px;
      margin-right: 8px;
      float: left;
      border: 1px solid transparent;
    }
    .color_selected {
      border: 1px solid rgba(59, 115, 240, 1);
    }
  }

  .card-main {
    width: 100%;
    height: 240px;
    background: rgba(252, 175, 162, 0.3);
    padding: 12px;
    box-sizing: border-box;
    font-family: "宋体";
    .message {
      background: none;
      outline: none;
      border: none;
      resize: none;
      height: 172px;
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
      font-size: 15px;
    }
    .name {
      font-family: "楷体";
      width: 100%;
      box-sizing: border-box;
      padding: 8px;
      background: none;
      border: 1px solid #00000060;
      height: 36px;
      line-height: 36px;
      font-size: 15px;
      text-align: right;
    }
  }
}
</style>
