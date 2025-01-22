<template>
  <div class="hero bg-base-200 min-h-screen">
    <Toast />
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6">Lets Explore More With Us!</p>
      </div>
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form class="card-body" @submit.prevent="handleLogin">
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
              <a href="#" class="label-text-alt link link-hover"
                >Forgot password?</a
              >
            </label>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" severity="secondary">
              <font-awesome-icon icon="fa-solid fa-user" /> Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStorage";
import { Toast, useToast } from "primevue";
import { reactive } from "vue";

const toast = useToast();
const authStorage = useAuthStore();

const user = reactive({
  email: "",
  password: "",
});

const showToast = (severity, summary, detail) => {
  toast.add({
    severity: severity,
    summary: summary,
    detail: detail,
    life: 3000,
  });
};

const handleLogin = async () => {
  try {
    const response = await authStorage.LoginUser(user);
    showToast("success", "Successfull", `Login successful`);
    authStorage.generateOtpCode(authStorage.currentUser.email);
  } catch (error) {
    console.log(error);
    showToast("error", "Login Failed", "Invalid Email or Password");
  }
};
</script>
