import { apiClient } from "@/services/apiClient";
import { defineStore } from "pinia";

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    token: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null,
  }),
  actions: {
    async order(payload) {
      console.log(this.token);
      try {
        const response = await apiClient.post("order", payload, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
    async orderList() {
      try {
        const response = await apiClient.get("order", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
});
