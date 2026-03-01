import { createRouter, createWebHashHistory } from "vue-router";
import { useCartStore } from "../stores/cart";

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
        path: "product/:productId",
        name: "ProductDetail",
        component: () => import("../pages/client/ProductDetail.vue"),
      },
      {
        path: "checkout",
        name: "Checkout",
        component: () => import("../pages/client/Checkout.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("../pages/client/notFoundPage.vue"),
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
        path: "products",
        name: "Products",
        component: () => import("../pages/admin/Products.vue"),
      },
      {
        path: "orders",
        name: "Orders",
        component: () => import("../pages/admin/Orders.vue"),
      },
      {
        path: "coupons",
        name: "Coupons",
        component: () => import("../pages/admin/Coupons.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "AdminNotFound",
        component: () => import("../pages/admin/notFoundPage.vue"),
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    name: "GlobalNotFound",
    component: () => import("../pages/client/notFoundPage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    return { top: 0 };
  },
});

// 導航守衛 : 檢查購物車是否為空
router.beforeEach(async (to, from, next) => {
  // 前往結帳頁面時檢查購物車
  if (to.name === "Checkout") {
    // 如果是從綠界付款完成導向回來的，直接放行
    if (to.query.payment === "success") {
      next();
      return;
    }

    const cartStore = useCartStore();

    await cartStore.getCart();

    if (cartStore.isEmpty) {
      next({ name: "Home", query: { showEmptyCartMsg: "true" } }); // 購物車為空，導向首頁
      return;
    }
  }
  next();
});

export default router;
