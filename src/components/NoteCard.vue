<template>
  <div class="note-card" :style="{ width: width, background: cardColor[card.color] }">
    <div cLass="top">
      <p class="time">{{ dateOne(card.moment) }}</p>
      <p class="label">{{ label[card.type][card.label] }}</p>
    </div>
    <p class="message title-menu-min">{{ card.message }}</p>
    <div class="foot">
      <div class="footer-left">
        <div class="icon">
          <span class="iconfont icon-aixin1" :class="{ isLike: card.islike[0].count > 0 }"></span>
          <span class="value">{{ card.like[0].count }}</span>
        </div>
        <div class="icon">
          <span class="iconfont icon-liuyan"></span>
          <span class="value">{{ card.comment }}</span>
        </div>
      </div>
      <div class="name">{{ card.name }}</div>
    </div>
  </div>
</template>

<script>
import { label, cardColor } from "@/utils/data";
import { dateOne } from "@/utils/time_format";
export default {
  name: "NoteCard",
  props: {
    width: {
      default: "100%",
    },
    note: {
      default: {},
    },
  },
  computed: {
    //监听卡片数量变化
    card() {
      return this.note;
    },
  },
  methods: {
    dateOne,
  },
  created() {
    // console.log(this.card);
  },
  data() {
    return {
      label, //分类标签
      cardColor, //卡片背景色
    };
  },
};
</script>

<style lang="less" scoped>
.note-card {
  height: 240px;
  padding: 10px 20px;
  box-sizing: border-box;
  position: relative;
  transition: all 0.3s;
  font-size: 18px;
  &:hover {
    transform: translateY(-5px);
  }
  .top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
    p {
      font-size: 12px;
      color: #949494;
      font-weight: 400;
    }
  }
  .message {
    height: 140px;
    font-family: xp;
    font-size: 16px;
    color: @gray-1;
    letter-spacing: 0.5px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .foot {
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    position: absolute;
    bottom: 16px;
    left: 0;
    padding: 0 20px;
    .footer-left {
      display: flex;
      .value {
        font-size: 12px;
        color: @gray-3;
        line-height: 16px;
        padding-left: @padding-4;
      }
      .iconfont {
        font-size: 16px;
        color: @gray-3;
      }
      .icon {
        display: flex;
        align-items: center;
        padding-right: 10px;
      }
      .icon-aixin1 {
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          color: @error-color;
        }
      }
      .isLike {
        color: @error-color;
      }
    }
    .name {
      font-family: "xp";
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>
