import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    //首页
    path: "/",
    redirect: "/wall",
    name: "Index",
    component: () => import("../views/Index.vue"),
    children: [{ path: "/wall", name: "WallMessage", component: () => import("../views/WallMessage.vue") }],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
