<template>
  <div class="wall-message">
    <!-- 主页面板 -->
    <p class="title">{{ wallType[id].name }}</p>
    <p class="slogan">{{ wallType[id].slogan }}</p>
    <div class="label">
      <p class="label-list" :class="{ label_selected: nlabel == -1 }" @click="selectNode(-1)">全部</p>
      <p class="label-list" :class="{ label_selected: nlabel == index }" v-for="(item, index) in label[id]" :key="index" @click="selectNode(index)">
        {{ item }}
      </p>
    </div>
    <!-- note卡片组件 -->
    <!-- 留言墙与照片墙的卡片切换  -->
    <!-- 留言墙卡片 -->
    <div class="card" :style="{ width: nwidth + 'px' }" v-show="id == 0">
      <NoteCard v-for="(item, index) in cards" :key="index" :note="item" class="card-inner" :width="'288px'" :class="{ cardSelected: index == cardSelected }" @toDetail="selectCad(index)"></NoteCard>
    </div>
    <!-- 照片墙图片 -->
    <div class="photo" v-show="id == 1">
      <PhotoCard v-for="(item, index) in photos" :key="index" :photo="item" class="photo-card" @click="selectCad(index)"></PhotoCard>
    </div>
    <!-- 卡片为空的状态 -->
    <div class="none-msg" v-if="isOk == 0">
      <img :src="none[id].url" />
      <p>{{ none[id].msg }}</p>
    </div>
    <!-- 加载中的状态 -->
    <div class="loading" v-show="isOk == -1">
      <div id="lottie"></div>
      <p>加载中...</p>
    </div>
    <!-- 加载完成,没有更多了 -->
    <p class="bottom-tip" v-show="isOk == 2">没有更多了...</p>

    <!-- 添加卡片按钮 -->
    <div class="add" :style="{ bottom: addBottom + 'px' }" @click="changeModal()" v-show="!modal">
      <span class="iconfont icon-tianjia"></span>
    </div>
    <!-- 弹出层模态框 -->
    <Modal :title="title" @close="closeModal()" :idModal="modal">
      <!-- 新建卡片组件 -->
      <NewCard :id="id" @addClose="addClose()" v-if="cardSelected == -1" @clickbt="clickbt"></NewCard>
      <!-- 这里弹出层要区分是留言墙还是照片墙的数据 -->
      <CardDetail :card="cards[cardSelected]" v-else="cardSelected !== -1" :idDeleteObj="idDeleteObj" @deleteCard="deleteCard" @deletePhoto="deletePhoto"></CardDetail>
    </Modal>
    <!-- 照片弹出层 -->
    <PhotoView :isView="isView" :photos="photoArr" :nowNumber="cardSelected" @viewSwitch="viewSwitch"></PhotoView>
  </div>
</template>

<script>
import { label, wallType, none } from "@/utils/data";
import NoteCard from "@/components/NoteCard.vue";
import Modal from "@/components/Modal.vue";
import NewCard from "@/components/NewCard.vue";
import CardDetail from "@/components/CardDetail.vue";
import PhotoCard from "@/components/PhotoCard.vue";
import PhotoView from "@/components/PhotoView.vue";
// import { photos } from "../../mock/index";
import lottie from "lottie-web";
import loadingJson from "@/assets/images/loading.json";
import { findWallPageApi, likeCountApi } from "@/api/index";
export default {
  name: "WallMessage",
  data() {
    return {
      wallType,
      label, //当前的标签
      // id: 0, // 留言墙与照片墙的切换id
      nlabel: -1, //当前对应的标签
      note: [], //mock数据,留言墙的卡片数据
      photos: [], //照片数据数据
      photoArr: [], //图片数组url
      nwidth: 0, //卡片模块宽度
      addBottom: 30, //add按钮bottom的变量
      title: "写留言", //新建标题
      modal: false, //模态框的显示与隐藏
      cardSelected: -1, //当前选择的卡片
      isView: false, //照片弹出层是否显示
      isOk: -1, //是否加载中, -1为加载中、0为没有拿到数据,1正常显示 2没有更多了
      none, //当前none空状态图片
      userId: "", //vuex的用户id值
      page: 1, //当前页码
      pageSize: 15, //每页多少条留言
      pic_page: 1, //当前页码
      pic_pageSize: 10, //每页多少条图片
      idDeleteObj: {
        DeleteIndex: 0, //在卡片中的索引位置
        isDelete: 0, //判断是不是该用户的留言,显示删除选项  0-举报  1-删除
      },
    };
  },
  computed: {
    // 获取id属性值,判断是留言墙还是照片墙
    id() {
      return this.$route.query.id;
    },
    //区分照片墙还是留言墙
    cards() {
      let data = "";
      if (this.$route.query.id == 0) {
        data = this.note;
      } else if (this.$route.query.id == 1) {
        data = this.photos;
      }
      return data;
    },
  },
  //监听属性值id的变化,代表是否切换留言墙与照片墙
  watch: {
    id(newVal, oldVal) {
      this.modal = false;
      this.isView = false;
      this.nlabel = -1;
      this.cardSelected = -1;
      if (newVal == 0) {
        let notePage = this.page - 1;
        if (notePage < 1) {
          notePage = 1;
        }
        this.page = notePage;
        this.getWallCard(newVal);
      } else {
        let picPage = this.pic_page - 1;
        if (picPage < 1) {
          picPage = 1;
        }
        this.pic_page = picPage;
        this.getPhotoCard(newVal);
      }

      // 传数据
      if (newVal != oldVal) {
        this.cards.forEach((item) => {
          // 判断是否点击过照片墙与视频墙切换，显示爱心bug修复。
          let likeData = {
            wid: item.id, //当前卡片的id
            uid: this.$store.state.user.id, //当前登录的ip用户 150.12.16.18
          };
          // 判断当前ip地址有没有点击过爱心
          likeCountApi(likeData).then((res) => {
            // console.log(res.message[0].count, item); //是否点击过爱心
            // console.log(res, likeData); //是否点击过爱心

            if (res.message[0].count == 0) {
              item.islike[0].count = 0;
            } else {
              item.islike[0].count = 1;
            }
          });
        });
        // console.log(this.cards);
      }
    },
  },
  mounted() {
    this.noteWidth();
    //监听屏幕宽度变化
    window.addEventListener("resize", this.noteWidth);
    // 初始状态，先把滚动条置为零。
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }
    //监听高度滚动
    window.addEventListener("scroll", this.scrollBottom);
    // 鼠标悬停按钮添加id 做动画
    let btn = document.querySelector(".add");
    // 移入
    btn.addEventListener("mouseover", function (e) {
      btn.id = "animation-plus";
    });
    // 移出
    btn.addEventListener("mouseout", function (e) {
      btn.id = "animation-reduce";
    });
    // // 获取图片数组
    // this.getPhoto();

    // 实现loading加载效果
    this.loading();

    // 先加载用户的ip信息
    this.testUser();
  },
  unmounted() {
    //注销在全局绑定的事件
    window.addEventListener("resize", this.noteWidth);
    //注销监听高度滚动
    window.addEventListener("scroll", this.scrollBottom);
  },
  methods: {
    //选择节点,切换label
    selectNode(element) {
      this.nlabel = element;

      //清空当前数据
      this.note = [];
      this.page = 1;
      this.getWallCard(this.id);

      // 图片清空
      this.photos = [];
      this.photoArr = [];
      this.pic_page = 1;
      this.getPhotoCard(this.id);
    },
    //获取note宽度
    noteWidth() {
      //页面宽度
      let wWidth = document.body.clientWidth;
      this.nwidth = Math.floor((wWidth - 120) / 300) * 300; //卡片对应的总宽度
    },
    //监听页面滚动条的高度变化
    scrollBottom() {
      //获取距离顶部的高度
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      //可视化区域高度
      let clientHeight = document.documentElement.clientHeight;
      //内容高度
      let contentHeight = document.documentElement.scrollHeight;
      // console.log("距离顶部的高度: ", Math.floor(scrollTop), "可视化区域高度: ", Math.floor(clientHeight), "内容高度: ", Math.floor(contentHeight));

      //做判断,代表我已经滚动到了底部footer与内容之间的距离
      if (scrollTop + clientHeight + 200 >= contentHeight) {
        this.addBottom = 30 + scrollTop + clientHeight + 200 - contentHeight;
      } else {
        this.addBottom = 30;
      }
      // 加载更多留言墙数据
      if (Math.abs(Math.floor(scrollTop) + Math.floor(clientHeight) - Math.floor(contentHeight)) < 3) {
        // console.log("开始加载数据");
        setTimeout(() => {
          this.getWallCard(this.id);
        }, 100);
        this.getPhotoCard(this.id);
      }

      // if (parseInt(scrollTop.toFixed(0)) + clientHeight == contentHeight) {
      //   this.getWallCard(this.id);
      //   this.getPhotoCard(this.id);
      // }
    },

    //弹窗的显示与隐藏
    changeModal() {
      this.modal = !this.modal;
      this.title = "写留言";
    },
    // 模态框关闭图标
    closeModal() {
      this.modal = !this.modal;
      this.cardSelected = -1;
      // 隐藏照片弹出层
      if (this.id == 1) {
        this.isView = false;
      }
    },
    //传入子级,关闭弹窗
    addClose() {
      this.modal = false;
    },
    //选择对应的卡片
    selectCad(index) {
      // console.log(this.note[index].userId, this.$store.state.user.id);// 取出对应的卡片数据
      if (this.id == 0) {
        if (this.note[index].userId == this.$store.state.user.id || this.$route.query.user == "admin") {
          // 是自己的卡片
          this.idDeleteObj.isDelete = 1;
          this.idDeleteObj.DeleteIndex = index;
        } else {
          this.idDeleteObj.isDelete = 0;
          this.idDeleteObj.DeleteIndex = 0;
        }
      } else {
        // 照片墙
        // console.log(this.photos, this.$store.state.user.id);
        if (this.photos[index].userId == this.$store.state.user.id || this.$route.query.user == "admin") {
          // 是自己的卡片
          this.idDeleteObj.isDelete = 2; //删除照片
          this.idDeleteObj.DeleteIndex = index;
        } else {
          this.idDeleteObj.isDelete = 0;
          this.idDeleteObj.DeleteIndex = 0;
        }
      }

      if (index != this.cardSelected) {
        this.cardSelected = index;
        this.modal = true;
        // 显示照片弹出层
        if (this.id == 1) {
          this.isView = true;
        }
      } else {
        this.cardSelected = -1;
        this.modal = false;

        // 隐藏照片弹出层
        if (this.id == 1) {
          this.isView = false;
        }
      }
      //判断前面模态框开头的标题
      if (this.cardSelected == -1) {
        this.title = "写留言";
      } else {
        this.title = "";
      }
    },

    //图片弹出层组件左右按钮切换
    viewSwitch(index) {
      if (index == 0) {
        this.cardSelected--;
        // console.log(this.photos[this.cardSelected]);
        if (this.photos[this.cardSelected].userId == this.$store.state.user.id) {
          // 是自己的卡片
          this.idDeleteObj.isDelete = 2; //删除照片
          this.idDeleteObj.DeleteIndex = index;
        } else {
          this.idDeleteObj.isDelete = 0;
          this.idDeleteObj.DeleteIndex = 0;
        }
      } else {
        this.cardSelected++;
        // console.log(this.photos[this.cardSelected]);
        if (this.photos[this.cardSelected].userId == this.$store.state.user.id) {
          // 是自己的卡片
          this.idDeleteObj.isDelete = 2; //删除照片
          this.idDeleteObj.DeleteIndex = index;
        } else {
          this.idDeleteObj.isDelete = 0;
          this.idDeleteObj.DeleteIndex = 0;
        }
      }
    },
    // newCard传递过来的数据,进行插入
    clickbt(data) {
      // console.log(data);
      this.isOk = 1;
      this.cards.unshift(data);
      //如果是图片,加载图片链接
      if (this.id == 1) {
        this.photoArr.unshift(data.imgUrl);
      }
      this.addClose(); //关闭弹窗
    },
    // loading加载动画
    loading() {
      if (this.isOk == -1) {
        this.$nextTick(async () => {
          let params = {
            container: document.getElementById("lottie"),
            render: "svg",
            loop: true,
            autoplay: true,
            animationData: loadingJson,
          };
          lottie.loadAnimation(params);
        });
      }
    },
    // 获取卡片数据(从后端)
    getWallCard(id) {
      //只有page>0才执行
      if (id == 0) {
        if (this.page > 0) {
          this.isOk = -1; //加载中,进行数据的加载
          let data = {
            page: this.page,
            pageSize: this.pageSize,
            type: id,
            label: this.nlabel,
            userId: this.userId,
          };
          // console.log(data);
          findWallPageApi(data).then((res) => {
            // console.log(res);
            this.note = this.note.concat(res.message);
            // 数据对象去重
            let map = new Map();
            for (let item of this.note) {
              map.set(item.id, item);
            }
            this.note = [...map.values()];

            // 设置下一次的page
            if (res.message.length) {
              this.page++; //页面加1
            } else {
              this.page = 0; //数据加载完了,到底部了
            }

            //状态逻辑判断
            if (this.note.length > 0) {
              this.isOk = 1;
              if (this.page == 0) {
                this.isOk = 2;
              }
            } else {
              this.isOk = 0;
            }
          });
        }
      }
    },
    // 获取图片展示
    getPhotoCard(id) {
      if (id == 1) {
        //只有page>0才执行
        if (this.pic_page > 0) {
          this.isOk = -1; //加载中,进行数据的加载
          let data = {
            page: this.pic_page,
            pageSize: this.pic_pageSize,
            type: id,
            label: this.nlabel,
            userId: this.userId,
          };
          // console.log(data);
          findWallPageApi(data).then((res) => {
            this.photos = this.photos.concat(res.message);
            // 数据对象去重
            let map = new Map();
            for (let item of this.photos) {
              map.set(item.id, item);
            }
            this.photos = [...map.values()];
            // 设置下一次的page
            if (res.message.length) {
              this.pic_page++; //页面加1
            } else {
              this.pic_page = 0; //数据加载完了,到底部了
            }
            // console.log("页码: ", this.pic_page);
            //状态逻辑判断
            if (this.photos.length > 0) {
              this.isOk = 1;
              if (this.pic_page == 0) {
                this.isOk = 2;
              }
            } else {
              this.isOk = 0;
            }

            //如果为图片将图片单独拿出来
            if (this.id == 1) {
              for (let i = 0; i < this.photos.length; i++) {
                if (this.photoArr.indexOf(this.photos[i].imgUrl) == -1) {
                  this.photoArr.push(this.photos[i].imgUrl);
                }
              }
              // console.log(this.photoArr);
            }
          });
        }
      }
    },

    //获取用户id信息
    testUser() {
      setTimeout(() => {
        this.userId = this.$store.state.user.id;
        // console.log(this.userId);
        // 加载留言数据
        this.getWallCard(this.id);
        // 加载照片数据
        this.getPhotoCard(this.id);
      }, 100);
    },

    //子传父删除卡片数据。
    deleteCard(index) {
      // console.log("子传父: ", index);
      this.note.splice(index, 1);
      this.modal = false; //关闭弹窗
      this.$message({ type: "success", message: "删除留言成功~" });
      this.cardSelected = -1;
    },
    // 子传赋删除照片数据。
    deletePhoto(index) {
      this.modal = false; //关闭弹窗
      this.isView = false;

      this.photos.splice(index, 1);
      this.photoArr.splice(index, 1);

      this.$message({ type: "success", message: "删除照片成功~" });
      this.cardSelected = -1;
    },
  },
  components: {
    NoteCard,
    Modal,
    NewCard,
    CardDetail,
    PhotoCard,
    PhotoView,
  },
};
</script>

<style lang="less" scoped>
.wall-message {
  min-height: 700px;
  padding-top: 52px;
  .title {
    padding-top: 48px;
    padding-bottom: @padding-8;
    font-size: 56px;
    color: @gray-1;
    text-align: center;
    font-weight: 600;
  }
  .slogan {
    color: @gray-2;
    text-align: center;
    font-family: xp;
    font-size: 16px;
  }
  .label {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    font-weight: 700;
    cursor: pointer;
    .label-list {
      padding: 0 14px;
      line-height: 28px;
      margin: 4px;
      color: @gray-2;
      border: 1px solid transparent;
    }
    .label_selected {
      color: @gray-2;
      font-weight: 600;
      border: 1px solid rgba(32, 32, 32, 1);
      border-radius: 14px;
    }
  }
  .card {
    display: flex;
    flex-wrap: wrap;
    // justify-content: center;
    padding-top: 28px;
    margin: 0 auto;
    .card-inner {
      margin: 6px;
      border: 1px solid transparent;
    }
    //卡片选择到的样式
    .cardSelected {
      border: 1px solid @primary-color;
    }
  }
  .photo {
    width: 88%;
    margin: 0 auto;
    columns: 6; //6列
    column-gap: 4px;
    padding-top: 28px;
    .photo-card {
      margin-bottom: 4px;
      break-inside: avoid;
    }
  }
  // 空状态
  .none-msg {
    width: 100%;
    text-align: center;
    padding-top: 80px;
    position: absolute;
    top: 280px;
    img {
      display: inline;
    }
    p {
      font-family: serif;
      font-weight: 700;
      font-size: 24px;
      color: #a4a4a4;
    }
  }
  // 加载中的状态
  .loading {
    text-align: center;
    width: 100%;
    p {
      margin-top: -50px;
      font-size: 24px;
      font-family: serif;
      color: #a4a4a4;
    }
    #lottie {
      margin-top: 20px;
      height: 200px;
    }
  }
  .bottom-tip {
    text-align: center;
    padding: 20px;
    color: #a4a4a4;
  }
  .add {
    width: 56px;
    height: 56px;
    // background: #202020;
    background: #3b73f0;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
    border-radius: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: 30px;
    transition: all 0.3s;
    span {
      color: #fff;
      font-size: 24px;
    }
  }
}
</style>
