import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import WelcomeView from "@/views/WelcomeView.vue";
import ProductView from "@/views/ProductView.vue";
import { createRouter, createWebHistory } from "vue-router";
import AdminLayoutView from "@/views/admin/AdminLayoutView.vue";
import ProductLayoutView from "@/views/admin/view/ProductLayoutView.vue";
import WelcomeAdminView from "@/views/admin/view/WelcomeAdminView.vue";
import CategoryLayoutView from "@/views/admin/view/CategoryLayoutView.vue";
import OrderLayoutView from "@/views/admin/view/OrderLayoutView.vue";

const routes = [
  { path: "/", component: WelcomeView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/products",component:ProductView },
  { 
    path : '/admin',
    component:AdminLayoutView,
    children : [
      {
        path : '',
        name : 'welcome-admin',
        component : WelcomeAdminView
      },
      {
        path : 'category',
        name : 'category',
        component : CategoryLayoutView
      },
      {
        path : 'product',
        name : 'product',
        component : ProductLayoutView
      },
      {
        path : 'order-list',
        name : 'order',
        component : OrderLayoutView
      },
      {
        path : 'role',
        name : 'role',
      },
    ]
   }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
