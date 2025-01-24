<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6">Lets Explore More With Us!</p>
      </div>
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form class="card-body" @submit.prevent="handleLogin">
          <!-- Success Alert -->
          <div v-if="alertType === 'success'" class="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ alertMessage }}</span>
          </div>
          <!-- Error Alert -->
          <div v-if="alertType === 'error'" class="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span>{{ alertMessage }}</span>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              class="input input-bordered"
              v-model="user.email"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              class="input input-bordered"
              v-model="user.password"
              required
            />

            <label class="label">
              Need Account for Journey?
              <RouterLink to="/register">
                <p class="text-info">Regist Here</p>
              </RouterLink>
            </label>
          </div>
          <div class="form-control">
            <button class="btn btn-primary" severity="secondary">
              <span v-if="!isLoading"
                ><font-awesome-icon icon="fa-solid fa-user" /> Login</span
              >
              <span v-else class="loading loading-infinity loading-lg"></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router/route";
import { useAuthStore } from "@/stores/authStorage";
import { reactive, ref } from "vue";

const authStorage = useAuthStore();
const isLoading = ref(false);

const user = reactive({
  email: "",
  password: "",
});

const alertMessage = ref(null);
const alertType = ref(null);

const handleLogin = async () => {
  isLoading.value = !isLoading.value;
  try {
    const response = await authStorage.LoginUser(user);
    alertMessage.value = "Login successful";
    alertType.value = "success";
    setTimeout(() => {
      alertMessage.value = "";
      alertType.value = "";
      router.push("/");
    }, 500);
  } catch (error) {
    alertMessage.value = "An error occurred during login.";
    alertType.value = "error";

    setTimeout(() => {
      alertMessage.value = "";
      alertType.value = "";
    }, 3000);
    console.error(error);
  } finally {
    isLoading.value = !isLoading.value;
  }
};
</script>
