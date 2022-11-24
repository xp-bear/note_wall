<!-- 消息组件的封装 -->
<template>
  <transition name="down">
    <div class="message" v-if="isShow">
      <div class="m-i">
        <i class="iconfont" :class="style[type].icon"></i>
        <span class="text">{{ message }}</span>
        <i class="iconfont icon-guanbi" @click="msgClose"></i>
      </div>
    </div>
  </transition>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  name: "XPMessage",
  props: {
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      //warn警告 error 错误 success 成功
      default: "warn",
    },
  },
  setup() {
    //定义一个对象，包含三种情况的样式，对象key就是类型字符串
    const style = {
      warning: {
        icon: "icon-warning",
      },
      error: {
        icon: "icon-error",
      },
      success: {
        icon: "icon-success",
      },
    };
    //定义一个数据控制显示隐藏，默认是隐藏，组件挂载完毕显示
    const isShow = ref(true);
    onMounted(() => {
      //需调用钩子函数，等dom宣染完成后，再进行赋值，如果在setup中直接赋值，则会被直接渲染
      isShow.value = true;
      setTimeout(() => {
        isShow.value = false;
      }, 3000);
    });
    // 关闭按钮提示框
    const msgClose = () => {
      isShow.value = false;
      setTimeout(() => {
        isShow.value = true;
      }, 3000);
    };
    return {
      style,
      isShow,
      msgClose,
    };
  },
};
</script>

<style lang="less" scoped>
// 弹窗组件样式
.message {
  position: fixed;
  top: 55px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  z-index: 9999;
  line-height: 40px;

  .m-i {
    display: flex;
    vertical-align: top;
    padding: 0 20px;
    border-radius: 4px;
    color: @gray-1;
    background-color: #ffffff;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    vertical-align: middle;
    i {
      margin-right: 6px;
    }
    .icon-guanbi {
      color: red;
      margin: 0;
      text-align: right;
      font-size: 12px;
    }
    .text {
      margin-right: 20px;
    }
  }
  .icon-success {
    color: @success-color;
  }
  .icon-warning {
    color: @warning-color;
  }
  .icon-error {
    color: @error-color;
  }
}
// 添加动画
.down {
  &-enter {
    &-from {
      transform: translateY(-55px);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }

    &-to {
      transform: translateY(0px);
      opacity: 1;
    }
  }
  &-leave {
    &-from {
      transform: translateY(0px);
      opacity: 1;
    }
    &-active {
      transition: all 0.5s;
    }

    &-to {
      transform: translateY(-55px);
      opacity: 0;
    }
  }
}
</style>
