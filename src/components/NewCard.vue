<template>
  <div class="NewCard">
    <!-- 颜色选择列表 -->
    <div class="colors" v-show="id == 0">
      <p class="color-li" v-for="(item, index) in cardListColor" :key="index" :style="{ background: item }" :class="{ color_selected: index == selectedColor }" @click="selectColor(index)"></p>
    </div>
    <!-- 新建照片卡片 -->
    <div class="add-photo" v-if="id == 1">
      <input type="file" name="file" id="file" multiple="multiple" @change="showPhoto" @mousemove="moveChange" @mouseout="outChange" />
      <!-- 没有选择图片 -->
      <div class="add-bt" v-if="url == ''">
        <span class="iconfont icon-tianjia"></span>
      </div>
      <!-- 选择图片之后 -->
      <div class="change-bt" v-else ref="changeIcon">
        <svg t="1668665438571" class="icon icon-xiugai" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5101" width="16" height="16">
          <path
            d="M998.488123 371.015942l-345.591563-345.591563c-33.899172-33.899172-89.197822-33.899172-123.096995 0L25.511877 529.812065C9.112278 546.211665 0.0125 568.11113 0.0125 591.310564l0 345.591563c0 47.998828 39.099045 87.097874 87.097874 87.097874l368.391006 0c8.499792 0 16.599595-3.399917 22.599448-9.399771L998.488123 494.212934c16.3996-16.3996 25.499377-38.299065 25.499377-61.598496C1023.9875 409.415005 1014.887722 387.515539 998.488123 371.015942zM574.998462 70.723273c4.49989-4.49989 10.399746-6.699836 16.299602-6.699836 5.899856 0 11.799712 2.199946 16.299602 6.699836l151.896292 151.896292L255.806255 726.307268 87.610361 558.111374 574.998462 70.723273zM64.010937 936.902126 64.010937 625.009741l334.991821 334.991821L87.110373 960.001562C74.310686 960.001562 64.010937 949.601816 64.010937 936.902126zM953.189229 448.91404 465.801128 936.302141 301.105149 771.606162l503.687703-503.687703 148.496375 148.496375c4.399893 4.399893 6.799834 10.199751 6.799834 16.299602S957.589121 444.614145 953.189229 448.91404z"
            p-id="5102"
          ></path>
        </svg>
      </div>
      <!-- 显示选择的图片 -->
      <div class="photo-div"><img :src="url" /></div>
    </div>

    <!-- 新建卡片 -->
    <div class="card-main" :style="{ background: id == 0 ? cardColor[selectedColor] : cardColor[5] }">
      <textarea placeholder="留言..." class="message title-menu-min" ref="textarea" v-model="message"></textarea>
      <input type="text" placeholder="签名..." class="name" v-model="sign" />
    </div>
    <!-- 选择标签 -->
    <div class="labels">
      <p class="title">选择标签</p>
      <div>
        <p v-for="(item, index) in label[id]" :key="index" class="label-list" :class="{ label_selected: index == labelSelected }" @click="selectTag(index)">{{ item }}</p>
      </div>
    </div>
    <!-- 免责声明 -->
    <div class="responseibility">
      <p class="title">免责声明</p>
      <p>熊仔留言墙是本人独自开发的，为便于与用户交流的留言平台。请遵守如下内容：</p>
      <p>1、反对宪法所确定的基本原则的；</p>
      <p>2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家 统一的；</p>
      <p>3、损害国家荣誉和利益的；</p>
      <p>4、煽动民族仇恨、民族歧视，破坏民族团结的；</p>
      <p>5、破坏国家宗教政策，宣扬邪教和封建迷信的；</p>
      <p>6、散布谣言，扰乱社会秩序，破坏社会稳定的；</p>
      <p>7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>
      <p>8、侮辱或者诽谤他人，侵害他人合法权益的；</p>
      <p>9、含有法律、行政法规禁止的其他内容的信息。</p>
    </div>
    <!-- 发布留言按钮 -->
    <div class="bottom-btn">
      <Button size="max" nom="secondary" @click="closeModal()">丢弃</Button>
      <Button size="max" style="width: 200px" @click="submit()">确定</Button>
    </div>
  </div>
</template>

<script>
import { cardListColor, cardColor, label } from "@/utils/data";
import Button from "@/components/Button.vue";
import { getObjectURL } from "@/utils/upload";
import { insertWallApi } from "@/api/index";
export default {
  name: "NewCard",
  mounted() {
    this.$refs.textarea.focus(); //文本域聚焦
  },
  components: {
    Button,
  },
  data() {
    return {
      cardListColor, //上面选择选择框
      cardColor, //下面颜色选择note颜色
      selectedColor: 0, //卡片颜色选择序号
      label, //当前标签
      labelSelected: 0, //标签选择序号
      message: "", //留言信息
      sign: "", //签名
      url: "", //上传图片链接
    };
  },
  props: {
    id: {
      default: 0, //表示当前是在0留言墙 还是在 1照片墙
    },
  },
  methods: {
    // 卡片颜色选择序号函数
    selectColor(index) {
      this.selectedColor = index;
    },
    //标签选择序号
    selectTag(index) {
      this.labelSelected = index;
    },
    //关闭窗口
    closeModal() {
      this.$emit("addClose");
    },
    // 新建留言提交
    submit() {
      let name = "匿名";
      if (this.sign) {
        name = this.sign;
      }
      // 创建提交给后端的数据项
      let data = {
        type: this.id,
        message: this.message,
        name: name,
        userId: this.$store.state.user.id,
        moment: new Date(),
        label: this.labelSelected, //选择到对应标签的索引
        color: this.selectedColor, //留言背景颜色索引
        imgUrl: "",
      };
      // console.log(data);
      // 新建留言数据
      if (this.message && this.id == 0) {
        insertWallApi(data).then((res) => {
          // 自己造一张卡片
          let cradD = {
            type: this.id,
            message: this.message,
            name: name,
            userId: this.$store.state.user.id,
            moment: new Date(),
            label: this.labelSelected, //选择到对应标签的索引
            color: this.selectedColor, //留言背景颜色索引
            imgUrl: "",
            id: res.message.insertId,
            islike: [{ count: 0 }],
            like: [{ count: 0 }],
            comcount: [{ count: 0 }],
            report: [{ count: 0 }],
            revoke: [{ count: 0 }],
          };
          this.$emit("clickbt", cradD); //告诉父组件,新建一张卡片
          this.message = "";
          this.$message({ type: "success", message: "新增留言成功!" });
        });
      }
    },
    // 上传图片临时链接显示
    showPhoto() {
      let aa = getObjectURL(document.getElementById("file").files[0]);
      console.log(aa);
      this.url = aa;
    },
    // 鼠标经过,显示修改上传图标的背景
    moveChange() {
      this.$refs.changeIcon ? (this.$refs.changeIcon.style.backgroundColor = "#ffffff90") : "";
    },
    // 鼠标离开
    outChange() {
      this.$refs.changeIcon ? (this.$refs.changeIcon.style.backgroundColor = "#ffffff60") : "";
    },
  },
};
</script>

<style lang="less" scoped>
.NewCard {
  .colors {
    height: 36px;
    .color-li {
      width: 24px;
      height: 24px;
      margin-right: 8px;
      float: left;
      border: 1px solid transparent;
    }
    .color_selected {
      border: 1px solid rgba(59, 115, 240, 1);
    }
  }
  .add-photo {
    padding-bottom: 20px;
    position: relative;
    #file {
      position: absolute;
      z-index: 10;
      // top: -10px;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      opacity: 0;
      // background-color: rebeccapurple;
      cursor: pointer;
    }
    .add-bt {
      width: 64px;
      height: 64px;
      box-sizing: border-box;
      border: 1px solid #949494;
      border-radius: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .add-bt {
      span {
        font-size: 24px;
      }
    }
    .change-bt {
      position: absolute;
      width: 32px;
      height: 32px;
      margin-left: 16px;
      margin-top: 16px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ffffff80;

      .icon-xiugai {
        width: 16px;
        height: 16px;
      }
    }
    .photo-div {
      background-color: #f0f0f0;
      img {
        width: 100%;
      }
    }
  }
  .card-main {
    width: 100%;
    height: 240px;
    background: rgba(252, 175, 162, 0.3);
    padding: 12px;
    box-sizing: border-box;
    font-family: "宋体";
    .message {
      background: none;
      outline: none;
      border: none;
      resize: none;
      height: 172px;
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
      font-size: 15px;
      font-family: "xp";
    }
    .name {
      font-family: "xp";
      width: 100%;
      box-sizing: border-box;
      padding: 8px;
      background: none;
      border: 1px solid #00000060;
      height: 36px;
      line-height: 36px;
      font-size: 15px;
      text-align: right;
    }
  }
  .labels {
    .title {
      font-size: 14px;
      color: #202020;
      font-weight: 600;
      padding-top: 30px;
    }
    & > div {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      .label-list {
        border-radius: 14px;
        padding: 2px 10px;
        margin-top: 20px;
        cursor: pointer;
        border: 1px solid transparent;
      }
      //选中背景颜色
      .label_selected {
        // background: #ccc;
        border-radius: 14px;
        font-weight: 600;
        transition: all 0.3;
        border: 1px solid #3b73f0;
      }
    }
  }
  .responseibility {
    padding-bottom: 212px;

    .title {
      font-size: 14px;
      color: #202020;
      font-weight: 600;
      padding-top: 20px;
      padding-bottom: 10px;
    }
  }
  .bottom-btn {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 20px;
    position: fixed;
    bottom: 52px;
    display: flex;
    justify-content: space-between;
    transform: translateX(-20px);
    z-index: 100;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  }
}
</style>
