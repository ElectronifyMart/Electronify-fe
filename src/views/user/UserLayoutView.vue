<template>
  <MainLayoutView>
    <template #header>
      <NavbarUser />
    </template>
    <template #content>
      <SliderUser />
      <GridCategory />
      <GridProduct />
    </template>
    <template #footer>
      <FooterUser />
    </template>
  </MainLayoutView>
</template>

<script setup>
import FooterUser from "@/components/FooterUser.vue";
import GridCategory from "@/components/GridCategory.vue";
import GridProduct from "@/components/GridProduct.vue";
import NavbarUser from "@/components/NavbarUser.vue";
import SliderUser from "@/components/SliderUser.vue";
import MainLayoutView from "@/layouts/MainLayoutView.vue";
</script>
