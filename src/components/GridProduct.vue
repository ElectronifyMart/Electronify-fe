<template>
  <OrderModal :is-open="isOpen" :product="detailsProduct" @close="closeModalOrder" @order="createOrder" />
  <section>
    <h1 class="text-2xl text-left font-bold px-11 pt-10 xs:text-center sm:text-left md:text-left lg:text-left">
      Product
    </h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-10 py-3">
      <div v-if="!isLoading" class="w-58" v-for="item in products" :key="item.id">
        <div class="card overflow-hidden rounded-md">
          <div class="h-44 w-full border">
            <img :src="item.image ?? imgList2" alt="Shoes" class="h-full w-full object-cover" />
          </div>
          <div class="card-body">
            <h2 class="card-title overflow-hidden text-ellipsis whitespace-nowrap">
              {{ item.name }}
            </h2>
            <p class="overflow-hidden text-ellipsis whitespace-nowrap">
              {{ item.description }}
            </p>
            <p>{{ item.stock }}</p>
            <div class="card-actions justify-between">
              <h2>{{ formatterRupiah.formatPriceToIDR(item.price) }}</h2>

              <div>
                <button class="btn btn-success m-1" type="button" @click="order(item)">
                  Buy Now
                </button>
                <button class="btn btn-neutral" type="button" @click="detailProduct(item.id)">
                  Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="flex w-52 mr-6 flex-col gap-4" v-for="num in 5">
        <div class="skeleton h-32 w-full"></div>
        <div class="skeleton h-4 w-28"></div>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-full"></div>
      </div>

    </div>
  </section>
</template>
<script setup>
import imgList2 from "@/assets/imgList2.png";
import formatterRupiah from "@/services/formatterRupiah";
import { usePaymentStore } from "@/stores/paymentStore";
import { onMounted, ref } from "vue";
import OrderModal from "./modal/OrderModal.vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import { sha512 } from "js-sha512";
import { useAuthStore } from "@/stores/authStorage";
import { apiClient } from "@/services/apiClient";

const router = useRouter();
const id = ref({
  id: "",
});

const storePayment = usePaymentStore();
const productStore = useProductStore()

const isLoading = ref(false)
const detailsProduct = ref({})
const isOpen = ref(false)

const order = async (data) => {
  detailsProduct.value = data
  isOpen.value = !isOpen.value
}

const store = useAuthStore()
const userToken = ref(localStorage.getItem('token') ? JSON.parse(localStorage.getItem("token"))  : null)

const createOrder = async (data) => {
  data.email = store.currentUser.email
 const SERVER_KEY_MIDTRANS = import.meta.env.VITE_MIDTRANS_SERVER_KEY
  console.log(data);
  try {
    const response = await storePayment.order(data)
    console.log(response);
    await window.snap.pay(response.data.snap_token, {
      onSuccess: async function (result) {
        try {
          const server_key = sha512(
            result.order_id + result.status_code + result.gross_amount + SERVER_KEY_MIDTRANS)
          console.log(server_key);
          const response = await apiClient.post('midtrans/webhook', {
            order_id: result.order_id,
            status_code: result.status_code,
            gross_amount: result.gross_amount,
            signature_key: server_key,
            transaction_status: result.transaction_status
          }, {
            headers: {
              Authorization: `Bearer ${userToken.value}`
            }
          })
          console.log(response);
        } catch (error) {
          console.log(error);

        }

      },
      onPending: async function (result) {
        console.log(result);
        try {
          const server_key = sha512(
            result.order_id + result.status_code + result.gross_amount + SERVER_KEY_MIDTRANS)
          console.log(server_key);
          const response = await apiClient.post('midtrans/webhook', {
            order_id: result.order_id,
            status_code: result.status_code,
            gross_amount: result.gross_amount,
            signature_key: server_key,
            transaction_status: result.transaction_status
          }, {
            headers: {
              Authorization: `Bearer ${userToken.value}`
            }
          })
          console.log(response);

        } catch (error) {
          console.log(error);

        }
      },
      onError: async function (result) {
        try {
          const server_key = sha512(
            result.order_id + result.status_code + result.gross_amount + SERVER_KEY_MIDTRANS)
          console.log(server_key);
          const response = await apiClient.post('midtrans/webhook', {
            order_id: result.order_id,
            status_code: result.status_code,
            gross_amount: result.gross_amount,
            signature_key: server_key,
            transaction_status: result.transaction_status
          }, {
            headers: {
              Authorization: `Bearer ${userToken.value}`
            }
          })
          console.log(response);
        } catch (error) {
          console.log(error);

        }
      },
      onClose: async function () {
        console.log('customer closed the popup without finishing the payment')
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const detailProduct = (id) => {
  router.push({ name: "DetailProduct", params: { id: id } });
}


const products = ref([])

const getProduct = async () => {
  isLoading.value = !isLoading.value
  try {
    const response = await productStore.getProducts()
    products.value = response.data

    console.log(response);

  } catch (error) {
    console.log(error);

  } finally {
    isLoading.value = false
  }
}

const closeModalOrder = (data) => {
  isOpen.value = !data
}

onMounted(async () => {
  await getProduct()
})


</script>
