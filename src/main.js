import "./assets/tailwind.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/route";
import pinia from "./services/pinia";

import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas, far);
const app = createApp(App);

app.use(pinia);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);

app.mount("#app");
