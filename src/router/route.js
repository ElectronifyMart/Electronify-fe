import AdminLayoutView from "@/views/admin/AdminLayoutView.vue";
import CategoryLayoutView from "@/views/admin/view/CategoryLayoutView.vue";
import OrderLayoutView from "@/views/admin/view/OrderLayoutView.vue";
import ProductLayoutView from "@/views/admin/view/ProductLayoutView.vue";
import RoleLayoutView from "@/views/admin/view/RoleLayoutView.vue";
import WelcomeAdminView from "@/views/admin/view/WelcomeAdminView.vue";
import LoginView from "@/views/LoginView.vue";
import ProductView from "@/views/ProductView.vue";
import RegisterView from "@/views/RegisterView.vue";
import VerificationView from "@/views/VerificationView.vue";

import UserLayoutView from "@/views/user/UserLayoutView.vue";

import { useAuthStore } from "@/stores/authStorage";
import DetailProductView from "@/views/user/DetailProductView.vue";
import { createRouter, createWebHistory } from "vue-router";
import ListOrderView from "@/views/user/ListOrderView.vue";

const routes = [
  { path: "/", component: UserLayoutView },
  { path: "/login", component: LoginView, meta: { isLogin: true } },
  { path: "/register", component: RegisterView, meta: { isLogin: true } },
  {
    path: "/verification",
    component: VerificationView,
    meta: { isAuthTrue: true, isAuth: true },
  },
  { path: "/detail/:id", component: DetailProductView, name: "DetailProduct" },

  {
    path: "/admin",
    component: AdminLayoutView,
    meta: { isAdmin: true },
    children: [
      {
        path: "",
        name: "welcome-admin",
        component: WelcomeAdminView,
      },
      {
        path: "category",
        name: "category",
        component: CategoryLayoutView,
      },
      {
        path: "product",
        name: "product",
        component: ProductLayoutView,
      },
      {
        path: "order-list",
        name: "order",
        component: OrderLayoutView,
      },
      {
        path: "role",
        name: "role",
        component: RoleLayoutView,
      },
    ],
  },
  { path: "/products", component: ProductView },
  { path: "/order/list", component: ListOrderView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const store = await useAuthStore();
  if (
    to.meta.isAdmin &&
    store.currentUser.role_id == "46860524-0c29-4c96-ae51-cbef7cb1d6bb"
  ) {
    alert("Access Blocks for Users");
    return {
      path: "/",
    };
  }
  if (to.meta.isAuth && !store.tokenUser) {
    alert("Login to Access Content");
    return {
      path: "/login",
    };
  }
  if (
    to.meta.isAuthTrue &&
    store.tokenUser &&
    store.currentUser.email_verified_at != null
  ) {
    alert("Sudah Verifikasi");
    return {
      path: "/",
    };
  }
  if (to.meta.isLogin && store.tokenUser) {
    alert("Sudah Login");
    return {
      path: "/",
    };
  }
});

export default router;
