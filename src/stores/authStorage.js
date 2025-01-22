import { apiClient } from "@/services/apiClient";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    someState: 'hello pinia',
  }),
  
  persist : true,

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
