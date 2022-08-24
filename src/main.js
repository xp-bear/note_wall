import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/index";
//vue3使用axios
import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);
app.use(router).use(store).use(VueAxios, axios).mount("#app");
