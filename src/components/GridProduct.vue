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
      <div class="w-58" v-for="(item, index) in project" :key="item.id">
        <div class="card">
          <figure>
            <img :src="imgList2" alt="Shoes" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-between">
              <h2>Rp. 1.500</h2>
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import imgList2 from "@/assets/imgList2.png";
import { ref } from "vue";

const project = ref([
  {
    id: 2,
    title: "Handphone",
  },
  {
    id: 3,
    title: "Camera",
  },
  {
    id: 4,
    title: "Laptop",
  },
  {
    id: 5,
    title: "Spare Part Gaming",
  },
  {
    id: 6,
    title: "Handphone",
  },
  {
    id: 7,
    title: "Camera",
  },
  {
    id: 8,
    title: "Laptop",
  },
  {
    id: 9,
    title: "Spare Part Gaming",
  },
]);
</script>
