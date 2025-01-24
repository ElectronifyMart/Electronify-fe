<template>
  <!-- Logo Navbar -->
  <ModalProfile :is-open="isOpen" @close="closeModal" />
  <section class="fixed w-full top-0 left-0 z-10">
    <div class="navbar bg-base-100 glass">
      <div class="navbar-start">
        <a class="btn btn-ghost text-xl max-sm:hidden"
          ><router-link to="/">Electronify</router-link></a
        >

        <div class="dropdown max-sm:block hidden">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>

          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <div v-if="store.currentUser">
              <li><button @click="showSidebar">Profile</button></li>
              <li><button @click="handleLogout">Logout</button></li>
              <li><button>Product</button></li>
              <li><button>History</button></li>
            </div>
            <div v-else>
              <li>
                <router-link :to="{ path: '/login' }">
                  <button class="btn btn-outline btn-sm">Login</button>
                </router-link>
              </li>
              <li>
                <router-link :to="{ path: '/register' }">
                  <button class="btn btn-outline btn-sm">Register</button>
                </router-link>
              </li>
            </div>
          </ul>
        </div>
      </div>

      <div class="navbar-end">
        <div class="flex items-center gap-x-2 mr-6">
          <router-link :to="{ path: '/order/list' }">
            <button class="btn btn-ghost btn-sm max-md:hidden">History</button>
          </router-link>
        </div>
        <div class="dropdown dropdown-end" v-if="store.currentUser">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle avatar max-md:hidden"
          >
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                :src="test || defaultImage"
              />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <button class="justify-between" @click="showSidebar">
                Profile
                <span class="badge">New</span>
              </button>
            </li>
            <li><button @click="handleLogout">Logout</button></li>
          </ul>
        </div>

        <!-- Login and Register Buttons -->
        <div v-else class="flex items-center gap-x-2">
          <router-link :to="{ path: '/login' }">
            <button class="btn btn-outline btn-sm max-md:hidden">Login</button>
          </router-link>
          <router-link :to="{ path: '/register' }">
            <button class="btn btn-primary btn-sm max-md:hidden">
              Register
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import router from "@/router/route";
import { useAuthStore } from "@/stores/authStorage";
import { useProductStore } from "@/stores/productStore";
import { computed } from "vue";

const store = useAuthStore();
const emit = defineEmits(["sidebar"]);
const productStore = useProductStore();
const defaultImage =
  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

const profile = JSON.parse(localStorage.getItem("profile")) || {};
const test = profile.image || defaultImage;

const searchQuery = computed({
  get: () => productStore.searchQuery,
  set: (value) => productStore.updateSearchQuery(value),
});

const showSidebar = async () => {
  const res = await store.getAccount();
  console.log(res);
  if (store.tokenUser == null) {
    alert("Belum Login");
    router.replace("/");
  } else if (store.currentUser.email_verified_at == null) {
    alert("Belum Verifikasi");
    router.replace("/verification");
  } else {
    emit("sidebar", true);
  }
};

const handleLogout = async () => {
  try {
    const response = await store.LogoutUser();
    // console.log(response.data.message);
  } catch (error) {
    throw error;
  }
};
</script>
