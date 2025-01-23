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
        <EasyDataTable :headers="headers" :items="orders" table-class-name="customize-table" alternating
            :loading="isLoading">
            <template #loading>
                <img src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
                    style="width: 100px; height: 80px;" />
            </template>
            <template #item-product_name="items">
                {{ items.product.name }}
            </template>
            <template #item-fullname="items">
                {{ `${items.first_name} ${items.last_name}` }}
            </template>
            <template #item-price="items">
                {{ formatterRupiah.formatPriceToIDR(items.product.price) }}
            </template>
            <template #item-total_price="items">
                {{ formatterRupiah.formatPriceToIDR(items.total_price) }}
            </template>
        </EasyDataTable>
    </main>
</template>

<script setup>
import formatterRupiah from '@/services/formatterRupiah';
import { usePaymentStore } from '@/stores/paymentStore';
import { onMounted, ref } from 'vue';
const headers = [
    { text: "ORDER ID", value: "order_id" },
    { text: "PRODUCT NAME", value: "product_name" },
    { text: "QUANTITY", value: "quantity" },
    { text: "PRICE", value: "price" },
    { text: "FULLNAME", value: "fullname" },
    { text: "ADDRESS", value: "address" },
    { text: "TOTAL PRICE", value: "total_price" },
    { text: "STATUS", value: "status" },
];

const paymentStore = usePaymentStore()

const searchField = ref("player");
const searchValue = ref("Stephen Curry");
const orders = ref([])

const isLoading = ref(false)

const getOrderList = async () => {
    isLoading.value = !isLoading.value
    try {
        const response = await paymentStore.orderList()
        orders.value = response.data
        console.log(response);

    } catch (error) {
        console.log(error);

    } finally {
        isLoading.value = !isLoading.value
    }
}

onMounted(async () => {
    await getOrderList()
})
</script>

<style scoped></style>