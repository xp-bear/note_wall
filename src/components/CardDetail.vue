<template>
  <div class="CardDetail">
    <div class="top-bt">
      <p class="revoke">联系墙主撕掉该便签</p>
      <p class="report">举报</p>
    </div>
    <!-- 卡片组件 -->
    <NoteCard :note="card" class="note-card"></NoteCard>
    <!-- 输入框文本域 -->
    <div class="form">
      <textarea placeholder="请输入评论内容…" class="title-menu-min"></textarea>
      <div class="bt">
        <input type="text" value="匿名" />
        <Button>评论</Button>
      </div>
    </div>
    <!-- 品论 -->
    <p class="title">评论 {{ card.comment }}</p>
    <div class="comment">
      <div class="comment-li" v-for="(item, index) in comments" :key="index">
        <div class="user-head" :style="{ backgroundImage: portrait[item.imgurl] }"></div>
        <div class="comment-m">
          <div class="m-top">
            <p class="name">{{ item.name }}</p>
            <p class="time">{{ dateOne(item.moment) }}</p>
          </div>
          <div class="m-bottom title-menu-min">{{ item.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteCard from "@/components/NoteCard.vue";
import Button from "@/components/Button.vue";
import { comments } from "../../mock/index";
import { portrait } from "@/utils/data";
import { dateOne } from "@/utils/time_format";
export default {
  name: "CardDetail",
  data() {
    return {
      comments: comments.data, //评论数组
      portrait, //背景头像
    };
  },
  methods: { dateOne },
  props: {
    card: {
      default: {},
    },
  },
  components: {
    NoteCard,
    Button,
  },
};
</script>

<style lang="less" scoped>
.CardDetail {
  // 初始化鼠标悬停卡片的位移距离为 0px
  .note-card {
    &:hover {
      transform: translate(0) !important;
    }
  }
  .top-bt {
    position: fixed;
    top: 22px;
    left: 20px;
    display: flex;
    box-sizing: border-box;
    font-size: 16px;
    font-family: "xp";
    font-weight: 400;
    .revoke {
      color: #3b73f0;
      margin-right: 30px;
      cursor: pointer;
    }
    .report {
      color: #f67770;
      cursor: pointer;
    }
  }
  .form {
    width: 100%;
    textarea {
      width: 100%;
      height: 56px;
      margin-top: 12px;
      border: 1px solid rgba(148, 148, 148, 1);
      resize: none;
      outline: none;
      font-size: 14px;
      color: #000;
      font-family: "xp";
      padding: 8px 10px 0;
      box-sizing: border-box;
    }
    .bt {
      width: 100%;
      display: flex;
      margin-top: 6px;
      display: flex;
      justify-content: space-between;
      input {
        width: 200px;
        border: 1px solid rgba(148, 148, 148, 1);
        font-size: 14px;
        color: #202020;
        font-weight: 400;
        padding: 8px 10px;
        font-family: "xp";
      }
    }
  }
  .title {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #202020;
    font-weight: 600;
    padding-top: 30px;
    padding-bottom: 20px;
  }
  .comment {
    padding-bottom: 100px;
    .comment-li {
      width: 100%;
      display: flex;
      padding-bottom: 30px;
      .user-head {
        flex: none;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        margin-right: 8px;
      }
      .comment-m {
        .m-top {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
          .name {
            font-family: PingFangSC-Semibold;
            font-size: 14px;
            color: #202020;
            font-weight: 600;
            margin-right: 4px;
          }
          .time {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #949494;
            font-weight: 400;
          }
        }
        .m-bottom {
          font-family: "xp";
          font-size: 14px;
          color: #202020;
          line-height: 22px;
          font-weight: 400;
          overflow: auto;
        }
      }
    }
  }
}
</style>
