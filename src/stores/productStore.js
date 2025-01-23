import { apiClient } from "@/services/apiClient";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("products", {
  state: () => ({}),
  actions: {
    async createProduct(payload) {
      const tokenUser = ref(
        localStorage.getItem("token")
          ? JSON.parse(localStorage.getItem("token"))
          : null
      );
      try {
        const response = await apiClient.post("product", payload, {
          headers: {
            Authorization: `Bearer ${tokenUser.value}`,
          },
        });
        console.log(tokenUser.value);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async getProducts(id) {
      try {
        const response = await apiClient.get("product", {
          params: id ? { category_id: id } : {},
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
});
