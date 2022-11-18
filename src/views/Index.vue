<template>
  <div class="wall-index">
    <!-- 导航条 -->
    <TopBar></TopBar>
    <!-- 视频背景 -->
    <video src="@/assets/images/qm1.mp4" autoPlay="autoplay" muted="muted" loop="loop" class="bg-video"></video>
    <!-- 路由占位符 -->
    <router-view></router-view>
    <!-- 脚部组件 -->
    <FooterBar></FooterBar>
  </div>
</template>

<script>
//引入组件
import TopBar from "@/components/TopBar";
import FooterBar from "@/components/FooterBar";
import { signIpApi } from "@/api/index";
export default {
  name: "Index",
  data() {
    return {};
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      //获取用户ip地址
      signIpApi().then((res) => {
        let user = {
          id: res.ip,
        };
        this.$store.commit("getUser", user);
      });
    },
  },
  components: {
    TopBar,
    FooterBar,
  },
};
</script>

<style lang="less" scoped>
.wall-index {
  .bg-video {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -99;
    height: 840px;
  }
}
</style>
