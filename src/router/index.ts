import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  // ==== 前台 =====
  {
    path: "/",
    component: () => import("../pages/client/ClientLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../pages/client/Home.vue"),
      },
      {
        path: "menu",
        name: "Menu",
        component: () => import("../pages/client/Menu.vue"),
      },
      {
        path: "about",
        name: "About",
        component: () => import("../pages/client/About.vue"),
      },
    ],
  },
  // 後台登入
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/admin/Login.vue"),
  },
  // ==== 後台 (Admin) =====
  {
    path: "/admin",
    component: () => import("../pages/admin/AdminLayout.vue"),
    meta: { requiresAuth: true }, // 之後用來判斷是否需要登入
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("../pages/admin/Dashboard.vue"),
      },
      {
        path: "products",
        name: "Products",
        component: () => import("../pages/admin/Products.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
