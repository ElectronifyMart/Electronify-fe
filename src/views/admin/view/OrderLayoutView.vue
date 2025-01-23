<template>
    <header>
        <div class="w-full flex justify-between items-center py-4">
            <h1 class="text-2xl font-semibold">List Order</h1>
            <button class="btn btn-primary" type="button" @click="openModalProduct">
                Add order
            </button>
        </div>
    </header>
   <main class="flex flex-col gap-y-4 w-full">
    <div class="relative">
        <label for="" class="absolute top-3 left-2">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </label>
        <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs pl-8" />
    </div>
    <EasyDataTable
    :headers="headers"
    :items="items"
    :search-field="searchField"
    :search-value="searchValue"
     table-class-name="customize-table"
     alternating
  />
   </main>
</template>

<script setup>
import { usePaymentStore } from '@/stores/paymentStore';
import { onMounted, ref } from 'vue';
const headers = [
  { text: "ORDER ID", value: "order_id" },
  { text: "QUANTITY", value: "quantity"},
  { text: "TOTAL PRICE", value: "total_price"},
  { text: "PRODUCT NAME", value: "product_name"},
  { text: "STATUS", value: "status"},
];

const items = [

];

const paymentStore = usePaymentStore()

const searchField = ref("player");
const searchValue = ref("Stephen Curry");

const getProduct = async ()=>{
    try {
        const response = await paymentStore.orderList()
        console.log(response);
        
    } catch (error) {
        console.log(error);
        
    }
}

onMounted(async ()=>{
    await getProduct()
})
</script>

<style scoped>
</style>