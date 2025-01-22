<template>
    <CategoriModal></CategoriModal>
    <header>
        <div class="w-full flex justify-between items-center py-4">
            <h1 class="text-2xl font-semibold">List Category</h1>
            <button class="btn btn-primary" type="button" @click="openModalProduct">
                Add category
            </button>
        </div>
    </header>
    <main class="flex flex-col gap-y-4 w-full">
        <div class="relative">
            <label for="search" class="absolute top-3 left-2">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </label>
            <input id="search" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs pl-8" />
        </div>
        <div class="w-full">
            <EasyDataTable :headers="headers" :items="items" :search-field="searchField" :search-value="searchValue"
                table-class-name="customize-table" alternating>
                <template #item-action>
                    <button class="btn btn-outline btn-info btn-sm">
                        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                    </button>
                </template>
            </EasyDataTable>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import CategoriModal from "@/components/modal/CategoriModal.vue";
const headers = [
    { text: "NAME", value: "name" },
    { text: "ACTION", value: "action" },
];

const items = [
    {
        name: "Laptop",
    },
    {
        name: "Handphone",
    },
    {
        name: "Earphone",
    },
    {
        name: "Keyboard",
    },
    {
        name: "PC",
    },
    {
        name: "Hardware",
    },
];

const searchField = ref("name");
const searchValue = ref("");
</script>

<style scoped>
.customize-table {
    --easy-table-body-item-padding: 10px;
}
</style>