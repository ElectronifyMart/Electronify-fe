import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import VerificationView from "@/views/VerificationView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/verification", component: VerificationView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
