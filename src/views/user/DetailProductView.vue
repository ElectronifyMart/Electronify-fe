<template>
  <section class="flex justify-center items-center min-h-screen">
    <div v-if="product" class="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img :src="product.image" alt="Product Image" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ product.name }}</h2>
        <h3>Price: Rp. {{ product.price }}</h3>
        <p>Stock: {{ product.stock }}</p>
        <p>{{ product.description ?? 'Description not available' }}</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
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

onMounted(() => {
  const productId = route.params.id;
  if (productId) {
    getProductDetail(productId);
  }
});
</script>
