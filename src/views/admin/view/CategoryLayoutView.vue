<template>
  <!-- Add Modal -->
  <AddModal
    v-if="isEdit && isOpen"
    :is-open="isOpen"
    @close="closeModalCategori"
    @refresh="getCategori"
  />

  <!-- Edit Modal -->
  <CategoriModal
    v-if="!isEdit && isOpen"
    :is-open="isOpen"
    :category="selectedCategory"
    @close="closeModalCategori"
    @refresh="getCategori"
  />

  <header>
    <div class="w-full flex justify-between items-center py-4">
      <h1 class="text-2xl font-semibold">List Category</h1>
      <button class="btn btn-primary" type="button" @click="openModalCategori">
        Add category
      </button>
    </div>
  </header>

  <main class="flex flex-col gap-y-4 w-full">
    <div class="relative">
      <label for="search" class="absolute top-3 left-2">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </label>
      <input
        id="search"
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full max-w-xs pl-8"
      />
    </div>
    <div v-if="categories.length > 0" class="w-full">
      <EasyDataTable
        :headers="headers"
        :items="categories"
        table-class-name="customize-table"
        alternating
      >
        <template #item-action="item">
          <button
            class="btn btn-outline btn-info btn-sm"
            @click="handleEdit(item)"
          >
            <font-awesome-icon icon="fa-solid fa-pen-to-square" /> Edit
          </button>
          <button
            class="btn btn-outline btn-error btn-sm"
            @click="deleteCategory(item.id)"
          >
            <font-awesome-icon icon="fa-solid fa-trash" /> Delete
          </button>
        </template>
      </EasyDataTable>
    </div>
  </main>
</template>

<script setup>
import AddModal from "@/components/modal/AddModal.vue";
import CategoriModal from "@/components/modal/CategoriModal.vue";
import { apiClient } from "@/services/apiClient";
import { onMounted, ref } from "vue";

const headers = [
  { text: "NAME", value: "name" },
  { text: "ACTION", value: "action" },
];

const categories = ref([]);
const selectedCategory = ref(null);
const isOpen = ref(false);
const isEdit = ref(false);
const items = ref();

const openModalCategori = (category = null) => {
  selectedCategory.value = category;
  isEdit.value = !!category; // true jika category tidak null
  items.value = category || { name: "" }; // Pastikan `items` kosong saat menambahkan kategori baru
  isOpen.value = true;
};
const closeModalCategori = (data) => {
  isOpen.value = data;
  isEdit.value = false;
};

const getCategori = async () => {
  try {
    const response = await apiClient.get("/category");
    categories.value = response.data.data.map((item) => ({
      id: item.id,
      name: item.name,
    }));
  } catch (error) {
    console.error(error);
  }
};

const handleEdit = (item) => {
  openModalCategori();
  selectedCategory.value = item;
  isOpen.value = true;
  items.value = item;
  console.log(item);
};

const deleteCategory = async (id) => {
  if (confirm("Are you sure you want to delete this category?")) {
    try {
      await apiClient.delete(`/category/${id}`);
      categories.value = categories.value.filter(
        (category) => category.id !== id
      );
      alert("Category deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete category.");
    }
  }
};

onMounted(() => {
  getCategori();
});
</script>

<style scoped>
.customize-table {
  --easy-table-body-item-padding: 10px;
}
</style>
