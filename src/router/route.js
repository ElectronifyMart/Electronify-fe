import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
