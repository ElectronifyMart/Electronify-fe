import { apiClient } from "@/services/apiClient";
import  { defineStore } from "pinia";

export const usePaymentStore = defineStore('payment',{
    state : ()=>({

    }),
    actions : {
        async order (payload){
            try {
                const response = await apiClient.post('order',payload)
                return response;
            } catch (error) {
                throw error
            }
        },
        async orderList (){
            try {
                const response = await apiClient.get('order')
                return response;
            } catch (error) {
                throw error
            }
        }
    }
})