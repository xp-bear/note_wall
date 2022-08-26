<template>
  <div class="note-card" :style="{ width: width, background: 'rgba(252, 175, 168,0.3)' }">
    <div cLass="top">
      <p class="time">2022.07.12</p>
      <p class="label">熊仔</p>
    </div>
    <p class="message">很想知道博主的学习方法，因为我自己也在自学，就是学会了某一些东西用法之后，就是不知道什么时候该用什么来解决问题。</p>
    <div class="foot">
      <div class="footer-left">
        <div class="icon">
          <span class="iconfont icon-aixin1"></span>
          <span class="value">3</span>
        </div>
        <div class="icon">
          <span class="iconfont icon-liuyan"></span>
          <span class="value">3</span>
        </div>
      </div>
      <div class="name">匿名</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteCard",
  props: {
    width: {
      default: "288px",
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
// 自定义字体
@font-face {
  font-family: xp;
  src: url("@/assets/fonts/xp.ttf");
}
.note-card {
  height: 240px;
  padding: 10px 20px;
  box-sizing: border-box;
  position: relative;
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
    font-family: serif;
    font-size: 14px;
    color: @gray-1;
    letter-spacing: 0.5px;
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
    }
    .name {
      font-family: serif;
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>
