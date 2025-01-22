<template>
  <OrderModal :is-open="isOpen" :product="detailProduct"/>
  <section>
    <h1 class="text-2xl text-left font-bold px-11 pt-10 xs:text-center sm:text-left md:text-left lg:text-left">
      Product
    </h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-10 py-3">
      <div class="w-58 rounded-md overflow-hidden" v-for="(item, index) in products" :key="item.id">
        <div class="card">
          <div class="h-44 overflow-hidden">
            <img :src="item.image ?? imgList2" alt="Shoes" class="h-full w-full object-cover"/>
          </div>
          <div class="card-body">
            <h2 class="card-title">{{ item.name }}</h2>
            <p>{{ item.description ?? 'Description not available' }}</p>
            <div class="card-actions justify-between">
              <h2>{{ formatterRupiah.formatPriceToIDR(item.price) }}</h2>
              <button class="btn btn-primary" type="button" @click="order(item)">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import imgList2 from "@/assets/imgList2.png";
import formatterRupiah from "@/services/formatterRupiah";
import { usePaymentStore } from "@/stores/paymentStore";
import { useProductStore } from "@/stores/productStore";
import { onMounted, ref } from "vue";
import OrderModal from "./modal/OrderModal.vue";


const storePayment = usePaymentStore()
const productStore = useProductStore()

const isLoading = ref(false)
const detailProduct = ref({})
const isOpen = ref(false)

const order = async (data) => {
  detailProduct.value = data
  isOpen.value = !isOpen.value
  
  try {
    // const checkoutPayload = {
      //   first_name : 'rahman',
    //   last_name : 'hayadi',
    //   address :'bandung',
    //   email : 'rahman@mail.com',
    //   quantity : 10,
    //   product_name : data.title,
    //   price : data.price
    // };
    // const response = await storePayment.order(checkoutPayload)
    // console.log(response);
    
    // await window.snap.pay(response.data.token);
  } catch (error) {
    console.log(error);
    
  }
  console.log(data);
}

const products = ref([])

const getProduct = async ()=>{
  isLoading.value = !isLoading.value
  try {
    const response = await productStore.getProducts()
    products.value = response.data

    console.log(response);
    
  } catch (error) {
    console.log(error);
    
  }finally{
    isLoading.value = !isLoading.value
  }
}

onMounted(async ()=>{
  await getProduct()
})

</script>
