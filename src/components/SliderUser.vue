<template>
  <section
    class="flex w-full overflow-hidden justify-center items-center pt-24"
  >
    <div
      class="card carousel xl:w-[1024px] lg:w-[800px] md:w-[650px] xs:w-[380px]"
    >
      <div
        v-for="(item, index) in project"
        :key="item.id"
        :id="'slide' + (index + 1)"
        class="carousel-item relative w-full"
        :class="{
          block: activeSlide === index,
          hidden: activeSlide !== index,
        }"
      >
        <div class="card items-center shadow-xl bg-white">
          <div class="overflow-hidden w-full h-[380px] xs:h-[280px]">
            <img :src="item.image" :alt="item.title" class="w-full h-full" />
          </div>
        </div>
        <div
          class="absolute left-5 right-5 top-[50%] flex -translate-y-1/2 transform justify-between"
        >
          <button
            class="btn btn-circle"
            @click="goToSlide((index - 1 + project.length) % project.length)"
          >
            ❮
          </button>

          <button
            class="btn btn-circle"
            @click="goToSlide((index + 1) % project.length)"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
    <!-- <router-link to="/products">
        <button type="button" class="btn btn-outline btn-primary w-full mt-5">
          Browse
        </button>
      </router-link> -->
  </section>
</template>

<script setup>
import imgList1 from "@/assets/imgList1.png";
import imgList2 from "@/assets/imgList2.png";
import { ref } from "vue";

const activeSlide = ref(0);

const project = ref([
  {
    id: 2,
    image: imgList1,
  },
  {
    id: 3,
    image: imgList2,
  },
]);
function goToSlide(index) {
  activeSlide.value = index;
}
</script>
