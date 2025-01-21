import AdminLayoutView from "@/views/admin/AdminLayoutView.vue";
import LoginView from "@/views/LoginView.vue";
import ProductView from "@/views/ProductView.vue";
import RegisterView from "@/views/RegisterView.vue";
import UserLayoutView from "@/views/user/UserLayoutView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: UserLayoutView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/products", component: ProductView },
  { path: "/admin", component: AdminLayoutView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
