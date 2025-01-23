<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="card bg-white shadow-lg p-6 rounded-lg max-w-sm w-full">
      <h1 class="text-2xl font-semibold text-center text-gray-800 mb-4">
        Verifikasi Akun
      </h1>
      <p class="text-sm text-gray-600 text-center mb-6">
        Masukkan kode OTP yang telah kami kirimkan ke Anda.
      </p>
      <form @submit.prevent="verification" class="space-y-4">
        <input
          type="text"
          v-model="otpCode"
          placeholder="Masukkan kode OTP"
          class="input input-bordered w-full"
          required
        />
        <button type="submit" class="btn btn-primary w-full">Verifikasi</button>
      </form>
      <div class="text-center mt-4">
        <p class="text-sm text-gray-600">Tidak menerima kode?</p>
        <button @click="generateOTP" class="btn btn-link text-blue-600">
          Kirim ulang OTP code
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStorage";
import { ref } from "vue";

const store = useAuthStore();
const otpCode = ref("");
const verification = async () => {
  try {
    const response = await store.verifikasiAccount(otpCode.value);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const generateOTP = async () => {
  try {
    await store.generateOtpCode(store.currentUser.email);
  } catch (error) {
    throw error;
  }
};
</script>
