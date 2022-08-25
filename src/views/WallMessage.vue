<template>
  <div class="wall-message">
    <p class="title">{{ wallType[id].name }}</p>
    <p class="slogan">{{ wallType[id].slogan }}</p>
    <div class="label">
      <p class="label-list" :class="{ label_selected: nlabel == -1 }" @click="selectNode(-1)">全部</p>
      <p class="label-list" :class="{ label_selected: nlabel == index }" v-for="(item, index) in label[id]" :key="index" @click="selectNode(index)">{{ item }}</p>
    </div>
  </div>
</template>

<script>
import { label, wallType } from "@/utils/data";
export default {
  name: "WallMessage",
  data() {
    return {
      wallType,
      label,
      id: 0, // 留言墙与照片墙的切换id
      nlabel: -1, //当前对应的标签
    };
  },
  methods: {
    //选择节点
    selectNode(element) {
      this.nlabel = element;
    },
  },
};
</script>

<style lang="less" scoped>
.wall-message {
  min-height: 700px;
  padding-top: 52px;
  .title {
    padding-top: 48px;
    padding-bottom: @padding-8;
    font-size: 56px;
    color: @gray-1;
    text-align: center;
    font-weight: 600;
  }
  .slogan {
    color: @gray-2;
    text-align: center;
  }
  .label {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    cursor: pointer;
    .label-list {
      padding: 0 14px;
      line-height: 28px;
      margin: 4px;
      color: @gray-2;
      border: 1px solid transparent;
    }
    .label_selected {
      color: @gray-2;
      font-weight: 600;
      border: 1px solid rgba(32, 32, 32, 1);
      border-radius: 14px;
    }
  }
}
</style>
