<template>
    <ModalProduct :is-open="isOpen" @close="closeModal"/>
    <header class="mb-5">
        <div class="w-full flex justify-between items-center py-4">
            <h1 class="text-2xl font-semibold">List Product</h1>
            <button class="btn btn-primary" type="button" @click="openModalProduct">
                Add product
            </button>
        </div>

        <div>
            <div class="w-full relative mb-5">
                <label for="search" class="absolute top-3 left-2">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </label>
                <input type="text" id="search" class="w-full h-12 focus:outline-none border rounded-md pl-8" placeholder="Type here...">
            </div>
        </div>

        <div>
            <select class="select select-bordered w-full lg:max-w-xs">
                <option disabled selected>Search By Category</option>
                <option>Game of Thrones</option>
                <option>Lost</option>
                <option>Breaking Bad</option>
                <option>Walking Dead</option>
            </select>
        </div>
    </header>
    <main class="flex flex-wrap gap-4 justify-center">
        <div class="card card-compact bg-base-100 w-80 shadow-xl relative max-md:w-72" v-for="num in 10">
            <figure>
                <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <p>Price Rp 1.000.000</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-accent btn-md text-white btn-outline">Edit</button>
                </div>
            </div>
            <button class="absolute top-2 right-2 text-black/50 hover:text-red-600 transition-colors ease">
                <font-awesome-icon icon="fa-solid fa-rectangle-xmark" size="xl" />
            </button>
        </div>
    </main>
</template>

<script setup>
import ModalProduct from '@/components/modal/ModalProduct.vue';
import { ref } from 'vue';

const isOpen = ref(false)

const openModalProduct = ()=>{
    isOpen.value = !isOpen.value
}

const closeModal = (data)=>{
    isOpen.value = data
}
</script>