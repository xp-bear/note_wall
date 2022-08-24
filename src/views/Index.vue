<template>
  <div class="title">index</div>
  <p class="bb">打开一刻时光</p>
  <span class="iconfont icon-aixin1"></span>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {};
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.axios.get(`http://150.158.21.251:4000/search?keywords=%E6%B5%B7%E9%98%94%E5%A4%A9%E7%A9%BA`).then((res) => {
        console.log(res.data);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  color: @link-color;
}
.icon-aixin1 {
  font-size: 40px;
  color: @primary-color;
}
</style>
