<template>
  <section>
    <h1
      class="text-2xl text-left font-bold px-11 pt-10 xs:text-center sm:text-left md:text-left lg:text-left"
    >
      Product
    </h1>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-10 py-3"
    >
      <div
        v-if="skeleton"
        class="w-58 shadow-xl"
        v-for="item in productList"
        :key="item.id"
      >
        <div class="card">
          <div class="h-48 overflow-hidden w-full">
            <img
              :src="item.image"
              alt="Shoes"
              class="h-full w-full object-contain"
            />
          </div>
          <div class="card-body">
            <h2
              class="card-title overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {{ item.name }}
            </h2>
            <p class="overflow-hidden text-ellipsis whitespace-nowrap">
              {{ item.description }}
            </p>
            <p>{{ item.stock }}</p>
            <div class="card-actions justify-between">
              <h2>Rp. {{ item.price }}</h2>

              <div>
                <button
                  class="btn btn-success m-1"
                  type="button"
                  @click="order(item)"
                >
                  Buy Now
                </button>
                <button
                  class="btn btn-neutral"
                  type="button"
                  @click="detailProduct(item.id)"
                >
                  Detail
                </button>

                <button class="btn btn-info w-full" type="button">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-row gap-x-10">
        <div class="flex w-72 flex-col gap-4" v-for="num in 3">
          <div class="skeleton h-32 w-full"></div>
          <div class="skeleton h-4 w-28"></div>
          <div class="skeleton h-4 w-full"></div>
          <div class="skeleton h-4 w-full"></div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { apiClient } from "@/services/apiClient";
import { usePaymentStore } from "@/stores/paymentStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const id = ref({
  id: "",
});

const storePayment = usePaymentStore();

const productList = ref([]);
const skeleton = ref(false);
const getProduct = async (url = "/product") => {
  skeleton.value = skeleton.value;
  try {
    const response = await apiClient.get(url);
    console.log(response);
    productList.value = response.data.data;
  } catch (error) {
    throw error;
  } finally {
    skeleton.value = !skeleton.value;
  }
};

const detailProduct = (id) => {
  router.push({ name: "DetailProduct", params: { id: id } });
};

const order = async (data) => {
  try {
    const checkoutPayload = {
      first_name: "rahman",
      last_name: "hayadi",
      address: "bandung",
      email: "rahman@mail.com",
      quantity: 10,
      product_name: data.name,
      price: data.price,
    };
    const response = await storePayment.order(checkoutPayload);
    console.log(response);

    await window.snap.pay(response.data.token);
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  getProduct();
});
</script>
