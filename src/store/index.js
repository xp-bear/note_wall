import { createStore } from "vuex";

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      user: "", //用户信息
    };
  },
  mutations: {
    // n 为外面传递过来的属性值
    getUser(state, n) {
      state.user = n;
    },
  },
});

export default store;
