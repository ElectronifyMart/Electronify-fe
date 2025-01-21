import { apiClient } from "@/services/apiClient";
import VerificationView from "@/views/VerificationView.vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("counter", {
  state: () => ({ save: { token: "token", user: "user" } }),
  persist: {
    pick: ["save.token", "save.user"],
  },
  actions: {
    async RegisterUser(payload) {
      try {
        const response = await apiClient.post("/auth/register", payload);
        return response;
      } catch (error) {
        throw error;
      }
    },
    async LoginUser(payload) {
      try {
        const response = await apiClient.post("/auth/login", payload);

        return response;
      } catch (error) {
        throw error;
      }
    },
  },
});   


