<template>
  <div class="wall-message">
    <!-- 主页面板 -->
    <p class="title">{{ wallType[id].name }}</p>
    <p class="slogan">{{ wallType[id].slogan }}</p>
    <div class="label">
      <p class="label-list" :class="{ label_selected: nlabel == -1 }" @click="selectNode(-1)">全部</p>
      <p class="label-list" :class="{ label_selected: nlabel == index }" v-for="(item, index) in label[id]" :key="index" @click="selectNode(index)">{{ item }}</p>
    </div>
    <!-- note卡片组件 -->
    <div class="card" :style="{ width: nwidth + 'px' }">
      <NoteCard v-for="(item, index) in note" :key="index" :note="item" class="card-inner" :width="'288px'" :class="{ cardSelected: index == cardSelected }" @click="selectCad(index)"></NoteCard>
    </div>
    <!-- 添加卡片按钮 -->
    <div class="add" :style="{ bottom: addBottom + 'px' }" @click="changeModal()" v-show="!modal">
      <span class="iconfont icon-tianjia"></span>
    </div>
    <!-- 弹出层模态框 -->
    <Modal :title="title" @close="changeModal()" :idModal="modal">
      <!-- 新建卡片组件 -->
      <NewCard :id="id" @addClose="addClose"></NewCard>
    </Modal>
  </div>
</template>

<script>
import { label, wallType } from "@/utils/data";
import NoteCard from "@/components/NoteCard.vue";
import Modal from "@/components/Modal.vue";
import NewCard from "@/components/NewCard.vue";
import { note } from "../../mock/index";
export default {
  name: "WallMessage",
  data() {
    return {
      wallType,
      label, //当前的标签
      id: 0, // 留言墙与照片墙的切换id
      nlabel: -1, //当前对应的标签
      note: note.data, //mock数据
      nwidth: 0, //卡片模块宽度
      addBottom: 30, //add按钮bottom的变量
      title: "写留言", //新建标题
      modal: false, //模态框的显示与隐藏
      cardSelected: 0, //当前选择的卡片
    };
  },
  mounted() {
    this.noteWidth();
    //监听屏幕宽度变化
    window.addEventListener("resize", this.noteWidth);
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

      //做判断,代表我已经滚动到了底部footer与内容之间的距离
      if (scrollTop + clientHeight + 200 >= contentHeight) {
        this.addBottom = 30 + scrollTop + clientHeight + 200 - contentHeight;
      } else {
        this.addBottom = 30;
      }
    },
    // //关闭弹窗,子传父的方法
    // close(e) {
    //   this.modal = false;
    // },
    // //点击添加按钮
    // addButton() {
    //   this.modal = true;
    // },
    //弹窗的显示与隐藏
    changeModal() {
      this.modal = !this.modal;
    },
    //传入子级,关闭弹窗
    addClose() {
      this.modal = false;
    },
    //选择对应的卡片
    selectCad(index) {
      this.cardSelected = index;
    },
  },
  components: {
    NoteCard,
    Modal,
    NewCard,
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
  }
  .label {
    display: flex;
    justify-content: center;
    margin-top: 40px;
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
  .add {
    width: 56px;
    height: 56px;
    background: #202020;
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
