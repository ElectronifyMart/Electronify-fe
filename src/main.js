import "./assets/tailwind.css";

import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/route";

import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";
import { createPinia } from "pinia";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

library.add(fas, far);
const MyPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        surface: {
          0: "#ffffff",
          50: "{zinc.50}",
          100: "{zinc.100}",
          200: "{zinc.200}",
          300: "{zinc.300}",
          400: "{zinc.400}",
          500: "{zinc.500}",
          600: "{zinc.600}",
          700: "{zinc.700}",
          800: "{zinc.800}",
          900: "{zinc.900}",
          950: "{zinc.950}",
        },
      },
    },
  },
});

const app = createApp(App);
const pinia = createPinia();
app.use(ToastService);
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
  },
});
app.use(router);
app.use(pinia);
app.component("EasyDataTable", Vue3EasyDataTable);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
