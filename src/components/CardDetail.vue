<template>
  <div class="CardDetail">
    <div class="top-bt">
      <p class="revoke" @click="informAdmin">联系墙主撕掉该便签</p>
      <p class="report" v-show="idDeleteBool == 0" @click="toReport">举报</p>
      <p class="report" v-show="idDeleteBool == 1" @click="toDeleteWall">删除留言</p>
      <p class="report" v-show="idDeleteBool == 2" @click="toDeletePhoto">删除照片</p>
    </div>
    <!-- 卡片组件 -->
    <NoteCard :note="card" class="note-card"></NoteCard>
    <!-- 输入框文本域 -->
    <div class="form">
      <textarea placeholder="请输入评论内容..." class="title-menu-min" v-model="disscuss"></textarea>
      <div class="bt">
        <input type="text" placeholder="签名..." v-model="name" />
        <Button :class="{ notallowed: !isDis }" @click="submit">评论</Button>
      </div>
    </div>
    <!-- 品论 -->
    <p class="title">评论 {{ cards.comcount[0].count }}</p>
    <div class="comment">
      <div class="comment-li" v-for="(item, index) in comments" :key="index">
        <div class="user-head" :style="{ backgroundImage: portrait[item.imgUrl], boxShadow: '0 0 3px #ccc' }"></div>
        <!-- <div class="user-head"><img :src="avatarImg[item.imgUrl]" alt="" /></div> -->
        <div class="comment-m">
          <div class="m-top">
            <p class="name">{{ item.name }}</p>
            <p class="time">{{ dateOne(item.moment) }}</p>
          </div>
          <div class="m-bottom title-menu-min">{{ item.comment }}</div>
        </div>
      </div>
      <p class="more" @click="getComment()" v-show="page > 0">加载更多</p>
    </div>
  </div>
</template>

<script>
import NoteCard from "@/components/NoteCard.vue";
import Button from "@/components/Button.vue";
// import { comments } from "../../mock/index";
import { portrait, rocoImg, avatarImg } from "@/utils/data";
import { dateOne } from "@/utils/time_format";
import { insertCommentApi, findCommentPageApi, deleteWallApi, deletePhotoApi } from "@/api/index";
export default {
  name: "CardDetail",
  data() {
    return {
      comments: [], //评论数组
      portrait, //背景头像 []
      rocoImg, //洛克头像背景
      avatarImg, //动漫人物头像背景
      disscuss: "", //输入的内容,
      name: "", //评论姓名
      // isDis: true, //按钮不可以点击,
      page: 1, //当前页
      pageSize: 10, //一页多少条评论
    };
  },
  mounted() {
    this.getComment();
  },
  methods: {
    dateOne,
    // 提交评论
    submit() {
      if (this.isDis) {
        //如果有用户就用头像，没有就用随机头像
        let img = Math.floor(Math.random() * 14);
        let data = {
          wallId: this.cards.id,
          userId: this.$store.state.user.id,
          imgUrl: img,
          comment: this.disscuss, //评论
          name: this.name,
          moment: new Date(),
        };
        // console.log(data);
        insertCommentApi(data).then((res) => {
          this.comments.unshift(data);
          this.cards.comcount[0].count++;
        });
        // 清空评论框
        this.disscuss = "";
        this.name = "";
        // this.$message({ type: "success", message: "发送成功!" });
      }
    },
    // 获取评论
    getComment() {
      if (this.page > 0) {
        let data = {
          page: this.page,
          pageSize: this.pageSize,
          id: this.cards.id,
        };
        findCommentPageApi(data).then((res) => {
          this.comments = this.comments.concat(res.message);
          // 设置下一次的page
          if (res.message.length == this.pageSize) {
            this.page++;
          } else {
            this.page = 0;
          }
        });
      }
    },
    //删除留言
    toDeleteWall() {
      // console.log("删除留言");
      // console.log(this.idDeleteObj.DeleteIndex);

      // 子传父删除留言事件
      this.$emit("deleteCard", this.idDeleteObj.DeleteIndex);

      let data = {
        id: this.cards.id,
      };
      deleteWallApi(data).then((res) => {
        // console.log(res);
      });
    },
    //删除照片。
    toDeletePhoto() {
      // console.log(this.idDeleteObj);
      // console.log(this.cards);
      // 子传父删除照片事件
      this.$emit("deletePhoto", this.idDeleteObj.DeleteIndex);

      let data = {
        id: this.cards.id,
      };
      deleteWallApi(data).then((res) => {
        // console.log(res);
      });

      // 删除服务器的图片
      let dataPic = {
        urlpath: this.cards.imgUrl,
      };
      deletePhotoApi(dataPic).then((res) => {
        // console.log(res);
      });
    },
    // 点击举报按钮。
    toReport() {
      this.$message({ type: "success", message: "举报信息已通知墙主!" });
    },
    //联系墙主删除便签。
    informAdmin() {
      this.$message({ type: "success", message: "已成功通知墙主，撕掉便签。" });
    },
  },
  props: {
    card: {
      default: {},
    },
    idDeleteObj: {
      //是否显示删除
      default: {},
      // idDeleteObj: {
      //   DeleteIndex: 0, //在卡片中的索引位置
      //   isDelete: 0, //判断是不是该用户的留言,显示删除选项  0-举报  1-删除
      // },
    },
  },
  computed: {
    isDis() {
      if (this.disscuss.length > 0 && this.name.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    // 获取修改卡片数据
    cards() {
      return this.card;
    },
    //是否显示删除
    idDeleteBool() {
      return this.idDeleteObj.isDelete;
    },
  },
  watch: {
    // 监听卡片变化
    card() {
      this.page = 1;
      this.comments = [];
      this.getComment();
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
  // 初始化鼠标悬停卡片的位移距离为 0px
  .note-card {
    &:hover {
      transform: translate(0) !important;
    }
  }
  .top-bt {
    position: fixed;
    top: 22px;
    left: 20px;
    display: flex;
    box-sizing: border-box;
    font-size: 16px;
    font-family: "xp";
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
  .title {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #202020;
    font-weight: 600;
    padding-top: 30px;
    padding-bottom: 20px;
  }
  .comment {
    padding-bottom: 120px;
    .comment-li {
      width: 100%;
      display: flex;
      padding-bottom: 30px;
      .user-head {
        flex: none;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        margin-right: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 28px;
          border-radius: 50%;
        }
      }
      .comment-m {
        .m-top {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
          .name {
            font-family: PingFangSC-Semibold;
            font-size: 14px;
            color: #202020;
            font-weight: 600;
            margin-right: 4px;
          }
          .time {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #949494;
            font-weight: 400;
          }
        }
        .m-bottom {
          font-family: "xp";
          font-size: 14px;
          color: #202020;
          line-height: 22px;
          font-weight: 400;
          overflow: auto;
        }
      }
    }
    .more {
      color: @gray-2;
      text-align: center;
      cursor: pointer;
      padding: 20px;
    }
  }
  .notallowed {
    opacity: 0.6;
    cursor: not-allowed;
    font-family: "xp";
  }
}
</style>
