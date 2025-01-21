<template>
    <AdminLayout>
        <template #content>
            <RouterView></RouterView>
        </template>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
</script>