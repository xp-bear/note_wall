<template>
  <div class="top-bar">
    <div class="logo">
      <img src="@/assets/images/yksg.svg" alt="" />
      <p class="logo-name">熊仔留言墙</p>
    </div>
    <div class="menu">
      <Button>留言墙</Button>
      <Button>照片墙</Button>
    </div>
    <div class="user">
      <div class="user-head"></div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
export default {
  name: "",
  data() {
    return {};
  },
  components: {
    Button,
  },
};
</script>

<style lang="less" scoped>
.top-bar {
  width: 100%;
  height: 52px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;
  .logo {
    display: flex;
    align-items: center;
    .logo-name {
      font-size: 20px;
      color: @gray-1;
      font-weight: 600;
      padding-left: 10px;
    }
  }
  .user {
    width: 200px;
    .user-head {
      border-radius: 50%;
      width: 36px;
      height: 36px;
      background-image: linear-gradient(to bottom, #373b44, #4286f4);
    }
  }
}
</style>
