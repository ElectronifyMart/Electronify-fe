<template>
  <!-- Logo Navbar -->
  <ModalProfile :is-open="isOpen" @close="closeModal" />
  <section class="fixed w-full top-0 left-0 z-10">
    <div class="navbar bg-base-100 glass">
      <div class="navbar-start">
        <a class="btn btn-ghost text-xl max-sm:hidden">daisyUI</a>

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
            <li><a>Cart</a></li>
            <li><button @click="showSidebar">Profile</button></li>
          </ul>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="navbar-center">
        <label
          class="input input-bordered flex items-center gap-2 lg:w-[585px] md:w-[350px] sm:w-[250px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd"
            />
          </svg>
          <input type="text" class="grow" placeholder="Search" />
        </label>
      </div>

      <div class="navbar-end">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span class="badge badge-sm indicator-item">8</span>
            </div>
          </div>

          <!-- Cart Session -->
          <!-- Cart and Profile Dropdown -->
          <div class="dropdown dropdown-end">
            <!-- Cart Dropdown -->
            <div
              tabindex="0"
              class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
              v-if="store.currentUser"
            >
              <div class="card-body">
                <span class="text-lg font-bold">8 Items</span>
                <span class="text-info">Subtotal: $999</span>
                <div class="card-actions">
                  <button class="btn btn-primary btn-block">View cart</button>
                </div>
              </div>
            </div>

            <!-- Profile Dropdown -->
            <div class="dropdown dropdown-end" v-if="store.currentUser">
              <div
                tabindex="0"
                role="button"
                class="btn btn-ghost btn-circle avatar"
              >
                <div class="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
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
                <li><a>Settings</a></li>
                <li><button @click="handleLogout">Logout</button></li>
              </ul>
            </div>

            <!-- Login and Register Buttons -->
            <div v-else class="flex items-center gap-x-2">
              <router-link :to="{ path: '/login' }">
                <button class="btn btn-outline btn-sm">Login</button>
              </router-link>
              <router-link :to="{ path: '/register' }">
                <button class="btn btn-primary btn-sm">Register</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useAuthStore } from "@/stores/authStorage";

const store = useAuthStore();
const emit = defineEmits(["sidebar"]);

const showSidebar = () => {
  emit("sidebar", true);
};

const handleLogout = async () => {
  try {
    const response = await store.LogoutUser();
    console.log(response.data.message);
  } catch (error) {
    throw error;
  }
};
</script>
