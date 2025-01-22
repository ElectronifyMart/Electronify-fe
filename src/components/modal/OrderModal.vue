<template>
    <div v-if="isOpen"
        class="w-full h-full bg-black/30 backdrop-blur-sm fixed z-20 inset-0 flex justify-center item-center">
        <div class="absolute right-4 top-2 rounded-full">
            <button class="btn btn-circle" @click="close">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div class="w-96 flex flex-col bg-slate-50 box-border">
            <div class="flex flex-col gap-">
                <div class="w-full h-44 overflow-hidden">
                    <img :src="product.image ?? img" alt="" class="w-full h-full object-cover" />
                </div>
                <div class="flex flex-col px-2 py-2 gap-2">
                    <div class="flex flex-row items-center justify-between">
                        <h1 class="text-2xl font-bold">{{ products.name }}</h1>
                        <h1 class="font-semibold h-full flex items-center">{{ formatterRupiah.formatPriceToIDR(products.price) }}</h1>
                    </div>
                    <p class="text-sm">{{ product.description ?? 'Description not available' }}</p>
                </div>
                <div class="flex justify-end px-2">
                    <div class="flex flex-row gap-2">
                        <button type="button" class="btn btn-outline btn-sm" @click="qtIncrement">
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </button>
                        <p class="flex justify-center items-center">{{ payload.quantity }}</p>
                        <button type="button" class="btn btn-outline btn-sm" @click="qtDecrement">
                            <font-awesome-icon icon="fa-solid fa-minus" />
                        </button>
                    </div>
                </div>
            </div>
            <div class="w-full box-border p-2 flex flex-col gap-2">
                <h1 class="text-xl font-semibold border-b">Your Information:</h1>
                <form action="#" class="w-full box-border flex flex-col gap-4">
                    <div class="flex flex-row gap-2">
                        <div class="flex flex-col w-1/2">
                            <label for="fname">Firstname</label>
                            <input class="focus:outline-none h-10 rounded pl-2 w-full border" type="text" id="fname" />
                        </div>
                        <div class="flex flex-col w-1/2">
                            <label for="lname">Lastname</label>
                            <input class="focus:outline-none h-10 rounded pl-2 w-full border" type="text" id="lname" />
                        </div>
                        <input type="number" v-model="payload.quantity" class="hidden">
                    </div>
                    <button
                        class="w-full h-10 bg-primary rounded text-white hover:bg-indigo-700 transition-colors duration-300"
                        type="submit">Order</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, watch } from "vue";
import img from "@/assets/imgList2.png";
import formatterRupiah from "@/services/formatterRupiah";

const props = defineProps({
    product: {
        type: Object,
        default: () => { },
    },
    isOpen: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(['close'])

const products = computed(() => props.product);

const payload = reactive({
    quantity: 0
})

const qtIncrement = () => {
    return payload.quantity++
}
const qtDecrement = () => {
    return payload.quantity--
}

const close = (data = false) => {
    emits('close', data)
}

watch(() => payload.quantity, () => {
    if (payload.quantity <= 0) {
        payload.quantity = 0
    }
})

// watch(()=>props.products,()=>{
//     console.log(props.products);

// })
</script>
