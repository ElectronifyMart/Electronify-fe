import { apiClient } from "@/services/apiClient";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore('products',{
    state : ()=>({

    }),
    actions : {
        async createProduct(payload){
            try {
                const response = await apiClient.post('product',payload,{
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(localStorage.getItem('token'));
                
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
