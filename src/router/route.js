import LoginView from "@/views/LoginView.vue";
import { createMemoryHistory, createRouter } from "vue-router";

LoginView

const routes = [
  // { path: "/", component: HomeView },
  { path: "/login", component: LoginView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
