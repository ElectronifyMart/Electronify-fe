<template>
  <section class="">
    <h1
      class="text-2xl text-left font-bold px-11 pt-10 xs:text-center sm:text-left md:text-left lg:text-left"
    >
      Recommended Category
    </h1>

    <div
      class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-3 pl-10 max-sm:pl-0 py-3 justify-around"
    >
      <div class="w-72" v-for="item in categoryList" :key="item.id">
        <div class="card flex items-center shadow-xl">
          <figure>
            <font-awesome-icon :icon="getIconForCategory(item.name)" />
          </figure>
          <div class="card-body pl-4">
            <h2 class="card-title">{{ item.name }}</h2>
            <p class="w-64">
              {{ getDescriptionForCategory(item.name) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { apiClient } from "@/services/apiClient";
import { onMounted, ref } from "vue";

const categoryList = ref([]);
const getCategory = async (url = "/category") => {
  try {
    const response = await apiClient.get(url);
    console.log(response);
    categoryList.value = response.data.data;
  } catch (error) {
    throw error;
  }
};

const project = ref([
  {
    id: 2,
    title: "Smartphones",
    icon: "fa-solid fa-mobile-screen",
    description: "Berbagai pilihan handphone terbaru dan terlengkap.",
  },
  {
    id: 3,
    title: "Laptops",
    icon: "fa-solid fa-laptop",
    description: "Laptop untuk pekerjaan, gaming, dan kebutuhan harian Anda.",
  },
  {
    id: 4,
    title: "Gaming",
    icon: "fa-solid fa-gamepad",
    description: "Aksesoris dan spare part gaming terbaik untuk Anda.",
  },
  {
    id: 5,
    title: "Cameras",
    icon: "fa-solid fa-camera",
    description:
      "Dapatkan kamera berkualitas tinggi untuk kebutuhan fotografi.",
  },
]);

const getIconForCategory = (categoryName) => {
  const category = project.value.find((p) => p.title === categoryName);
  return category ? category.icon : "fas fa-question-circle"; // fallback icon jika tidak ditemukan
};

const getDescriptionForCategory = (categoryName) => {
  const category = project.value.find((p) => p.title === categoryName);
  return category ? category.description : "Deskripsi tidak tersedia"; // fallback description jika tidak ditemukan
};

onMounted(() => {
  getCategory();
});
</script>

<style scoped>
/* .truncate {
  white-space: no-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
} */
</style>
