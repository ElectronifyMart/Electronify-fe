import { apiClient } from "@/services/apiClient";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore('category',{
    state : ()=>({

    }),
    actions : {
        async getCategories(){
            try {
                const response = await apiClient.get('category')
                return response.data
            } catch (error) {
                throw error
            }
        }
    }
})