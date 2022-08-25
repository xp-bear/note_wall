<template>
  <div class="footer-bar">
    <div class="left">
      <div class="footer-title">
        <img src="@/assets/images/logo.jpg" alt="" />
        <span>熊仔留言墙</span>
      </div>
      <p class="footer-info">
        熊仔留言墙是萧兮独自开发的，为便于与用户交流的留言平台。
        <br />
        <br />
        用户将留言便签贴在留言墙上，用户可以自定义便签颜色和内容属性，不仅可以用于交流，也是一场记录。
      </p>
      <br />
      <p class="footer-beian">声明&nbsp;&nbsp;&nbsp;&nbsp;备案/许可证粤ICP备19012866号 &nbsp;&nbsp;&nbsp;&nbsp;网站备案/许可证粤ICP备19012866号</p>
    </div>
    <div class="center">
      <span class="center-title">链接</span>
      <div class="center-link">
        <a href="#">熊仔音乐</a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="#">聊天室</a>
      </div>
    </div>
    <div class="right">
      <span class="right-title">打赏</span>
      <div class="right-pay">
        <div><img src="@/assets/images/person.jpg" alt="" /><span>微信支付</span></div>
        <div><img src="@/assets/images/person.jpg" alt="" /><span>支付宝支付</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterBar",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.footer-bar {
  width: 100%;
  height: 200px;
  background: @gray-1;
  display: flex;
  color: @gray-10;
  font-family: PingFangSC-Regular;
  padding: 22px 199px 0;
  box-sizing: border-box;
  .left {
    // flex: 1.3;
    .footer-title {
      display: flex;
      margin-bottom: 22px;
      img {
        margin-right: 10px;
      }
      span {
        letter-spacing: 0;
        text-align: justify;
        font-weight: 600;
        font-size: 20px;
      }
    }
    .footer-info {
      width: 400px;
      opacity: 0.5;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: justify;
      font-weight: 400;
    }
    .footer-beian {
      width: 460px;
      height: 17px;
      opacity: 0.5;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: justify;
      font-weight: 400;
    }
  }
  .center {
    flex: 1;
    .center-title {
      height: 22px;
      opacity: 0.5;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: justify;
      font-weight: 400;
    }
    .center-link {
      a {
        font-size: 12px;
        color: #ffffff;
        opacity: 0.5;
      }
    }
  }
  .right {
    width: 240px;
    block-size: border-box;
    .right-title {
      display: block;
      height: 22px;
      opacity: 0.5;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: justify;
      font-weight: 400;
      margin-bottom: 8px;
    }
    .right-pay {
      display: flex;
      justify-content: space-between;
      div {
        width: 100px;
        // margin-right: 40px;

        img {
          width: 100%;
        }
        span {
          opacity: 0.5;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: justify;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
