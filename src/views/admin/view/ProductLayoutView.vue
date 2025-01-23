<template>
  <ModalProduct
    :is-open="isOpen"
    :is-submit="isSubmit"
    @close="closeModal"
    @getInfo="getInfoResponse"
    :item="items"
  />
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
        <input
          type="text"
          id="search"
          class="w-full h-12 focus:outline-none border rounded-md pl-8"
          placeholder="Type here..."
        />
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
    <div
      v-if="info.status"
      role="alert"
      class="alert"
      :class="info.status == 'success' ? 'alert-success' : 'alert-danger'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ info.message }}</span>
    </div>
    <div
      class="flex-wrap justify-center flex gap-4"
      v-if="products.length === 0"
    >
      <div class="flex w-80 max-md:w-72 flex-col gap-4" v-for="skel in 3">
        <div class="skeleton h-48 w-full"></div>
        <div class="skeleton h-4 w-28"></div>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-full"></div>
      </div>
    </div>

    <div
      class="card card-compact bg-base-100 w-80 shadow-xl relative max-md:w-72 overflow-hidden"
      v-for="product in products"
      v-else
    >
      <div
        v-if="!product.image"
        class="w-full h-44 bg-slate-100 flex justify-center items-center text-black/20"
      >
        <h1 class="text-xl font-semibold uppercase">Electronify</h1>
      </div>
      <div
        v-else
        class="w-full h-44 bg-slate-100 flex justify-center items-center text-black/20"
      >
        <img :src="product.image" class="w-full h-full object-cover" />
      </div>
      <div class="card-body">
        <h2 class="card-title text-xl tracking-tight">{{ product.name }}</h2>
        <p>{{ formatterRupiah.formatPriceToIDR(product.price) }}</p>
        <p>{{ product.description ?? "Description not available" }}</p>
        <p>Stock : {{ product.stock }}</p>
        <div class="card-actions justify-end">
          <button
            class="btn btn-accent btn-md text-white btn-outline"
            @click="editModalProduct(product)"
          >
            Edit
          </button>
        </div>
      </div>
      <button
        class="absolute top-2 right-2 text-black/50 hover:text-red-600 transition-colors ease"
      >
        <font-awesome-icon icon="fa-solid fa-rectangle-xmark" size="xl" />
      </button>
    </div>
  </main>
</template>

<script setup>
import ModalProduct from "@/components/modal/ModalProduct.vue";
import formatterRupiah from "@/services/formatterRupiah";
import { useProductStore } from "@/stores/productStore";
import { onMounted, reactive, ref } from "vue";

const productStore = useProductStore();

const isSubmit = ref(false);
const items = ref();
const isOpen = ref(false);

const editModalProduct = (item) => {
  items.value = item;
  isOpen.value = !isOpen.value;
  isSubmit.value = false;
  console.log(items.value);
};

const openModalProduct = () => {
  isOpen.value = !isOpen.value;
  isSubmit.value = true;
};

const closeModal = (data) => {
  isOpen.value = data;
};

const products = ref([]);

const getProducts = async () => {
  try {
    const response = await productStore.getProducts();
    products.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const info = reactive({
  status: "",
  message: "",
});

const alert = ref(false);
const getInfoResponse = ({ status, message }) => {
  alert.value = !alert.value;
  info.status = status;
  info.message = message;
};

onMounted(async () => {
  await getProducts();
});
</script>
