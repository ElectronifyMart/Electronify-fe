<template>
  <MainLayoutView>
    <template #header>
      <NavbarUser @sidebar="showSidebar" />
    </template>
    <template #content>
      <SidebarProfile
        :is-profile="isProfile"
        @update:is-profile="closeSidebar"
      />
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
import SidebarProfile from "@/components/SidebarProfile.vue";
import SliderUser from "@/components/SliderUser.vue";
import MainLayoutView from "@/layouts/MainLayoutView.vue";
import { ref } from "vue";

const isProfile = ref(false);
const showSidebar = (data) => {
  isProfile.value = data;
};

const closeSidebar = (data) => {
  isProfile.value = data;
};
</script>
