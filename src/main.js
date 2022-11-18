import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/index";
//vue3使用axios
import axios from "axios";
import VueAxios from "vue-axios";

// 注册自己封装的组件
import XP from "@/components/XP/index";

const app = createApp(App);
app.use(router).use(store).use(VueAxios, axios).use(XP).mount("#app");
