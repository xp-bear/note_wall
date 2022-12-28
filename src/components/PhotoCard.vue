<template>
  <div class="PhotoCard">
    <img :src="photo.imgUrl" alt="" class="photo-img" />
    <div class="photo-bg"></div>
    <div class="photo-like" @click.stop="ckPhoto">
      <span class="iconfont icon-aixin1" :class="getIsLike()"></span>
      <span class="like-data">{{ photo.like[0].count }}</span>
    </div>
  </div>
</template>

<script>
import { label, cardColor } from "@/utils/data";
import { insertFeedBackApi, likeCountApi } from "@/api/index";

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
  methods: {
    ckPhoto() {
      // console.log(this.photo);
      // 判断是否点击过
      let likeData = {
        wid: this.photo.id, //当前卡片的id
        uid: this.$store.state.user.id, //当前登录的ip用户
      };
      // 判断当前ip地址有没有点击过爱心
      likeCountApi(likeData).then((res) => {
        // console.log(res.message[0].count, this.card); //是否点击过爱心
        // console.log(res, likeData); //是否点击过爱心

        if (res.message[0].count == 0) {
          let data = {
            wallId: this.photo.id, //当前卡片的id
            userId: this.$store.state.user.id, //当前登录的ip用户
            type: 0, //喜欢
            moment: new Date(), //时间
          };
          insertFeedBackApi(data).then((res) => {
            // console.log(res);
            this.photo.like[0].count++;
            this.photo.islike[0].count = 1;
          });
        }
      });
    },
    //改变颜色
    getIsLike() {
      if (this.photo.islike[0].count == 1) {
        return { isLike: true };
      }
      return { isLike: false };
    },
  },
};
</script>

<style lang="less" scoped>
.PhotoCard {
  .isLike {
    color: @error-color!important;
  }
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
    opacity: 0;
    transition: all 0.3s;
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
    opacity: 0;
    transition: all 0.3s;
    span:nth-child(1) {
      color: @gray-3;
      margin-right: 4px;
      cursor: pointer;
    }
    .like-data {
      color: @gray-1;
    }
  }
  &:hover {
    .photo-bg {
      opacity: 1;
    }
    .photo-like {
      opacity: 1;
    }
  }
}
</style>
