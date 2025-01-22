<template>
  <section>
    <div class="bg-gray-100 dark:bg-white pt-20" v-if="product">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row -mx-4">
          <div class="md:flex-1 px-4">
            <div
              class="h-[460px] bg-gray-300 dark:bg-gray-700 mb-4 overflow-hidden rounded-2xl"
            >
              <img
                class="w-full h-full object-cover"
                :src="product.image"
                alt="Product Image"
              />
            </div>
          </div>
          <div class="md:flex-1 px-4">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-black mb-2">
              {{ product.name }}
            </h2>
            <div class="flex mb-4">
              <div class="mr-4">
                <span class="font-bold text-gray-700 dark:text-black"
                  >Price:
                </span>
                <span class="text-gray-600 dark:text-black">
                  {{ formatToRupiah(product.price) }}</span
                >
              </div>
              <div>
                <span class="font-bold text-gray-700 dark:text-black"
                  >Availability:
                </span>
                <span class="text-gray-600 dark:text-black">
                  {{ product.stock }}</span
                >
              </div>
            </div>

            <div>
              <span class="font-bold text-gray-700 dark:text-black"
                >Product Description:</span
              >
              <p class="text-gray-600 dark:text-black text-sm mt-2">
                {{ product.description }}
              </p>
            </div>

            <div class="flex mt-3">
              <div class="w-1/2 px-2">
                <button
                  class="w-full bg-info text-black py-2 px-4 rounded-full font-bold"
                >
                  Add to Cart
                </button>
              </div>
              <div class="w-full px-2">
                <button
                  class="w-full bg-success text-black py-2 px-4 rounded-full font-bold"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { apiClient } from "@/services/apiClient";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const product = ref(null);

const getProductDetail = async (id) => {
  try {
    const response = await apiClient.get(`/product/${id}`);
    product.value = response.data.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
  }
};

const formatToRupiah = (value) => {
  if (typeof value !== "number") return value;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

onMounted(() => {
  const productId = route.params.id;
  if (productId) {
    getProductDetail(productId);
  }
});
</script>
