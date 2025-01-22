import "./assets/tailwind.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/route";

import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

library.add(fas, far);
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.component("EasyDataTable", Vue3EasyDataTable);
app.component("font-awesome-icon", FontAwesomeIcon);


app.mount("#app");
