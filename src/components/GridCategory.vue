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
      <div class="w-72" v-for="(item, index) in project" :key="item.id">
        <div class="card bg-base-100 image-full shadow-xl">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{{ item.title }}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
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
]);
</script>
