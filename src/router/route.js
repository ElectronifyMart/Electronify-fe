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

import DetailProductView from "@/views/user/DetailProductView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: UserLayoutView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/verification", component: VerificationView },
  { path: "/detail/:id", component: DetailProductView, name: "DetailProduct" },

  {
    path: "/admin",
    component: AdminLayoutView,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
