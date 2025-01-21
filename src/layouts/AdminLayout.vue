<template>
    <div class="grid md:grid-cols-[auto,1fr] max-md:grid-flow-row">
        <nav class="fixed inset-0 w-full h-14 flex flex-row justify-between px-4 items-center z-10 md:hidden glass">
            <h1 class="text-xl">
                Admin Dashboard
            </h1>
            <button @click="showAside" class="btn btn-square btn-ghost">
                <font-awesome-icon icon="fa-solid fa-bars" size="xl"/>
            </button>
        </nav>
        <aside class="border h-screen w-72 bg-primary md:sticky top-0 fixed z-10 transition-all duration-300" :class="translateX">
            <div class="w-full h-full flex justify-center items-center">
                <ul class="gap-x-4 h-72 grid grid-rows-4">
                    <li v-for="menu in menus" class="self-center px-4 rounded">
                        <router-link :to="menu.url">
                            <button
                                class="flex gap-x-4 px-4 py-4 w-full before:w-0 hover:before:w-full before:transition-all before:ease before:duration-300 before:h-full before:absolute relative items-center before:border-b  before:z-0 hover:text-secondary-content group">
                                <span class="relative z-10  w-10">
                                    <font-awesome-icon :icon="menu.icon" size="xl" />
                                </span>
                                <span
                                    class="relative z-10 text-start text-white group-hover:text-secondary-content">{{ menu.name }}</span>
                            </button>
                        </router-link>
                    </li>
                </ul>
            </div>
        </aside>
        <main class="px-4  max-md:mt-20">
            <slot name="content"/>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';


const menus = ref([
    {
        name: 'Categories',
        url: '/admin/category',
        icon: 'fa-solid fa-shapes'
    },
    {
        name: 'Products',
        url: '/admin/product',
        icon: 'fa-solid fa-parachute-box'
    },
    {
        name: 'Order list',
        url: '/admin/order-list',
        icon: 'fa-solid fa-book'
    },
    {
        name: 'Role',
        url: '/admin/role',
        icon: 'fa-solid fa-people-arrows'
    },
])

const isAsideVisible = ref(false); // Simpan status aside di sini
const translateX = ref('max-md:-translate-x-full');

const showAside = () => {
    isAsideVisible.value = !isAsideVisible.value;
    translateX.value = isAsideVisible.value ? 'max-md:translate-x-0' : 'max-md:-translate-x-full';
};
</script>