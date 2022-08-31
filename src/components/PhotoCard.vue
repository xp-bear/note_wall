<template>
  <div class="PhotoCard">
    <img :src="require('../../static/' + photo.imgurl + '.jpg')" alt="" class="photo-img" />
    <div class="photo-bg"></div>
    <div class="photo-like">
      <span class="iconfont icon-aixin1"></span>
      <span class="like-data">{{ photo.like }}</span>
    </div>
  </div>
</template>

<script>
import { label, cardColor } from "@/utils/data";
export default {
  name: "",
  data() {
    return {
      label,
      cardColor,
    };
  },
  props: {
    width: {
      default: "100%",
    },
    photo: {
      default: {},
    },
  },
};
</script>

<style lang="less" scoped>
.PhotoCard {
  position: relative;
  .photo-img {
    width: 100%;
  }
  .photo-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .photo-like {
    position: absolute;
    left: 8px;
    top: 8px;
    background: hsla(0, 0%, 100%, 0.8);
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    border-radius: 20px;
    height: 28px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    span:nth-child(1) {
      color: @gray-3;
      margin-right: 4px;
    }
    .like-data {
      color: @gray-1;
    }
  }
}
</style>
