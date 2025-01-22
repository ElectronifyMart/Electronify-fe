<template>
  <section>
    <h1 class="text-2xl text-left font-bold px-11 pt-10 xs:text-center sm:text-left md:text-left lg:text-left">
      Product
    </h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-10 py-3">
      <div class="w-58" v-for="(item, index) in project" :key="item.id">
        <div class="card">
          <figure>
            <img :src="imgList2" alt="Shoes" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-between">
              <h2>Rp. {{ item.price }}</h2>
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
import { usePaymentStore } from "@/stores/paymentStore";
import { ref } from "vue";


const storePayment = usePaymentStore()


const order = async (data) => {
  try {

    const checkoutPayload = {
      first_name : 'rahman',
      last_name : 'hayadi',
      address :'bandung',
      email : 'rahman@mail.com',
      quantity : 10,
      product_name : data.title,
      price : data.price
    };
    const response = await storePayment.order(checkoutPayload)
    console.log(response);
  
    await window.snap.pay(response.data.token);

    
  } catch (error) {
    console.log(error);
    
  }
  


}
const project = ref([
  {
    id: 2,
    title: "Handphone",
    price: 1_000_000
  },
  {
    id: 3,
    title: "Camera",
    price: 1_000_000
  },
  {
    id: 4,
    title: "Laptop",
    price: 1_000_000
  },
  {
    id: 5,
    title: "Spare Part Gaming",
    price: 1_000_000
  },
  {
    id: 6,
    title: "Handphone",
    price: 1_000_000
  },
  {
    id: 7,
    title: "Camera",
    price: 1_000_000
  },
  {
    id: 8,
    title: "Laptop",
    price: 1_000_000
  },
  {
    id: 9,
    title: "Spare Part Gaming",
    price: 1_000_000
  },
]);


</script>
