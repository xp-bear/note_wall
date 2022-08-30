<template>
  <div class="CardDetail">
    <div class="top-bt">
      <p class="revoke">联系墙主撕掉该便签</p>
      <p class="report">举报</p>
    </div>
    <!-- 卡片组件 -->
    <NoteCard :note="card"></NoteCard>
    <!-- 输入框文本域 -->
    <div class="form">
      <textarea placeholder="请输入评论内容…" class="title-menu-min"></textarea>
      <div class="bt">
        <input type="text" value="匿名" />
        <Button>评论</Button>
      </div>
    </div>
  </div>
</template>

<script>
import NoteCard from "@/components/NoteCard.vue";
import Button from "@/components/Button.vue";
export default {
  name: "CardDetail",
  data() {
    return {};
  },
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
  .top-bt {
    position: fixed;
    top: 22px;
    left: 20px;
    display: flex;
    box-sizing: border-box;
    font-size: 16px;
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
}
</style>
