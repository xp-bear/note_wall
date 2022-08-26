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

export default {
  name: "Index",
  data() {
    return {};
  },
  created() {
    // this.getData();
  },
  methods: {
    // getData() {
    //   this.axios.get(`http://150.158.21.251:4000/search?keywords=%E6%B5%B7%E9%98%94%E5%A4%A9%E7%A9%BA`).then((res) => {
    //     console.log(res.data);
    //   });
    // },
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
