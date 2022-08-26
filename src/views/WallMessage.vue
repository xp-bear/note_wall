<template>
  <div class="wall-message">
    <!-- 主页面板 -->
    <p class="title">{{ wallType[id].name }}</p>
    <p class="slogan">{{ wallType[id].slogan }}</p>
    <div class="label">
      <p class="label-list" :class="{ label_selected: nlabel == -1 }" @click="selectNode(-1)">全部</p>
      <p class="label-list" :class="{ label_selected: nlabel == index }" v-for="(item, index) in label[id]" :key="index" @click="selectNode(index)">{{ item }}</p>
    </div>
    <!-- note卡片组件 -->
    <div class="card" :style="{ width: nwidth + 'px' }">
      <NoteCard v-for="(item, index) in note" :key="index" :note="item" class="card-inner" :width="'288px'"></NoteCard>
    </div>
  </div>
</template>

<script>
import { label, wallType } from "@/utils/data";
import NoteCard from "@/components/NoteCard.vue";
import { note } from "../../mock/index";
export default {
  name: "WallMessage",
  data() {
    return {
      wallType,
      label,
      id: 0, // 留言墙与照片墙的切换id
      nlabel: -1, //当前对应的标签
      note: note.data, //mock数据
      nwidth: 0, //卡片模块宽度
    };
  },
  mounted() {
    this.noteWidth();
    //监听屏幕宽度变化
    window.addEventListener("resize", this.noteWidth);
  },
  unmounted() {
    //注销在全局绑定的事件
    window.addEventListener("resize", this.noteWidth);
  },
  methods: {
    //选择节点,切换label
    selectNode(element) {
      this.nlabel = element;
    },
    //获取note宽度
    noteWidth() {
      //页面宽度
      let wWidth = document.body.clientWidth;
      this.nwidth = Math.floor((wWidth - 120) / 300) * 300; //卡片对应的总宽度
    },
  },
  components: {
    NoteCard,
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
  .card {
    display: flex;
    flex-wrap: wrap;
    // justify-content: center;
    padding-top: 28px;
    margin: 0 auto;
    .card-inner {
      margin: 6px;
    }
  }
}
</style>
