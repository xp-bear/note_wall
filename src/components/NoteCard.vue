<template>
  <div class="note-card" :style="{ width: width, background: id == 0 ? cardColor[card.color] : cardColor[5] }">
    <div cLass="top">
      <p class="time">{{ dateOne(card.moment) }}</p>
      <p class="label">{{ label[card.type][card.label] }}</p>
    </div>
    <p class="message title-menu-min" @click="toDetail">{{ card.message }}</p>
    <div class="foot">
      <div class="footer-left">
        <div class="icon" @click="clickLike">
          <span class="iconfont icon-aixin1" :class="getIsLike()"></span>
          <span class="value">{{ card.like[0].count }}</span>
        </div>
        <div class="icon" v-show="card.comcount[0].count > 0">
          <span class="iconfont icon-liuyan"></span>
          <span class="value">{{ card.comcount[0].count }}</span>
        </div>
      </div>
      <div class="name">{{ card.name }}</div>
    </div>
  </div>
</template>

<script>
import { label, cardColor } from "@/utils/data";
import { dateOne } from "@/utils/time_format";
import { insertFeedBackApi, likeCountApi } from "@/api/index";
export default {
  name: "NoteCard",
  props: {
    width: {
      default: "100%",
    },
    note: {
      default: {},
    },
  },
  computed: {
    //监听卡片数量变化
    card() {
      return this.note;
    },
    // 获取到id的值的改变
    id() {
      return this.$route.query.id;
    },
  },
  methods: {
    dateOne,
    //显示详情
    toDetail() {
      this.$emit("toDetail");
    },
    //改变颜色
    getIsLike() {
      if (this.card.islike[0].count == 1) {
        return { isLike: true };
      }
      return { isLike: false };
    },
    // 点击喜欢爱心+1
    clickLike() {
      // 判断是否点击过
      let likeData = {
        wid: this.card.id, //当前卡片的id
        uid: this.$store.state.user.id, //当前登录的ip用户
      };
      // 判断当前ip地址有没有点击过爱心
      likeCountApi(likeData).then((res) => {
        // console.log(res.message[0].count, this.card); //是否点击过爱心
        console.log(res, likeData); //是否点击过爱心

        if (res.message[0].count == 0) {
          let data = {
            wallId: this.card.id, //当前卡片的id
            userId: this.$store.state.user.id, //当前登录的ip用户
            type: 0, //喜欢
            moment: new Date(), //时间
          };
          insertFeedBackApi(data).then((res) => {
            // console.log(res);
            this.card.like[0].count++;
            this.card.islike[0].count = 1;
          });
        }
      });
    },
  },
  created() {
    // console.log(this.card);
  },
  data() {
    return {
      label, //分类标签
      cardColor, //卡片背景色
    };
  },
};
</script>

<style lang="less" scoped>
.note-card {
  height: 240px;
  padding: 10px 20px;
  box-sizing: border-box;
  position: relative;
  transition: all 0.3s;
  font-size: 18px;
  &:hover {
    transform: translateY(-5px);
  }
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
    font-family: xp;
    font-size: 16px;
    color: @gray-1;
    letter-spacing: 0.5px;
    overflow-x: hidden;
    overflow-y: auto;
    cursor: pointer;
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
      .isLike {
        color: @error-color;
      }
    }
    .name {
      font-family: "xp";
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>
