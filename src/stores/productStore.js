import { apiClient } from "@/services/apiClient";
import { defineStore } from "pinia";


export const useProductStore = defineStore('products',{
    state : ()=>({

    }),
    actions : {
        async createProduct(payload){
            try {
                const response = await apiClient.post('product',payload)
                return response.data
            } catch (error) {
                throw error
            }
        },
        async getProducts(id){
            try {
                const response = await apiClient.get('product',{
                    params :id ? { category_id: id } : {}
                })
                return response.data
            } catch (error) {
                throw error
            }
        },
        
    }
})