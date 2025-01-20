import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "./HomeView.vue";
import LoginView from "./LoginView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
