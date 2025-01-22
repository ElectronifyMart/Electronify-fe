import { apiClient } from "@/services/apiClient";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("counter", {
  state: () => (
    {
      test: 'test'
    }
  ),
  persist: 
  {
    keys: ['test']
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
    async VerificationView(payload) {
      try {
        const response = await apiClient.post("/auth/verification", payload);
        return response;
      } catch (error) {
        throw error;
      }
    },
    async generateotp(payload) {
      try {
        const response = await apiClient.post("/auth/generate", payload);
        return response;
      } catch (error) {
        throw error;
      }
    },
    async AfterView(payload) {
      try {
        const response = await apiClient.post("/auth/after", payload);
        return response;
      } catch (error) {
        throw error;
      }
    }
  },
});   


