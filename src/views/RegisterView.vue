<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content flex-col lg:flex-row">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Register Now!</h1>
        <p class="py-6">Wanna Make A Journey?</p>
      </div>
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form class="card-body" @submit.prevent="handleRegist">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="fullname"
              class="input input-bordered"
              required
              v-model="user.name"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              class="input input-bordered"
              required
              v-model="user.email"
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
              required
              v-model="user.password"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password Confirmation</span>
            </label>
            <input
              type="password"
              placeholder="password confirmation"
              class="input input-bordered"
              required
              v-model="user.password_confirmation"
            />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover"
                >Forgot password?</a
              >
            </label>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary">
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
import { reactive } from "vue";
const authStorage = useAuthStore();
const user = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
const handleRegist = async () => {
  try {
    const response = await authStorage.RegisterUser(user);
    return response;
  } catch (error) {
    console.log(error);
  }
};
</script>
