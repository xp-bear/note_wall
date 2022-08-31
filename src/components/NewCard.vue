<template>
  <div class="NewCard">
    <!-- 颜色选择列表 -->
    <div class="colors">
      <p class="color-li" v-for="(item, index) in cardListColor" :key="index" :style="{ background: item }" :class="{ color_selected: index == selectedColor }" @click="selectColor(index)"></p>
    </div>
    <!-- 新建卡片 -->
    <div class="card-main" :style="{ background: cardColor[selectedColor] }">
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
      <Button size="max" nom="secondary" @click="closeModal(0)">丢弃</Button>
      <Button size="max" style="width: 200px" @click="closeModal(1)">确定</Button>
    </div>
  </div>
</template>

<script>
import { cardListColor, cardColor, label } from "@/utils/data";
import Button from "@/components/Button.vue";
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
    };
  },
  props: {
    id: {
      default: 0, //表示当前是在留言墙还是在照片墙
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
    closeModal(data) {
      this.$emit("addClose", data);
      console.log(data);
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
