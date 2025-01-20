import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import WelcomeView from "@/views/WelcomeView.vue";
import ProductView from "@/views/ProductView.vue";
import { createRouter, createWebHistory } from "vue-router";
import AdminLayoutView from "@/views/admin/AdminLayoutView.vue";

const routes = [
  { path: "/", component: WelcomeView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/products",component:ProductView }
  { path: "/admin",component:AdminLayoutView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
