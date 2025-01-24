<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white w-1/3 rounded-lg p-6 shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Add Category</h2>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <form @submit.prevent="submitCategory">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Name</label
          >
          <input
            type="text"
            v-model="payload.name"
            placeholder="Enter category name"
            class="border border-gray-300 rounded-lg px-4 py-2 w-full"
          />
        </div>

        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="close"
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { apiClient } from "@/services/apiClient";
import { reactive } from "vue";

const props = defineProps({
  isOpen: { type: Boolean, default: true },
  isEdit: { type: Boolean, default: false },
  category: { type: Object, default: {} },
});
const emit = defineEmits(["close", "handlecategory"]);
const close = () => {
  emit("close", false);
};
const payload = reactive({
  name: "",
});

const submitCategory = async () => {
  try {
    const respons = await apiClient.post("category", payload);
    console.log(respons);
  } catch (error) {
    console.log(error);
  } finally {
    close();
    payload.name = "";
  }
};
</script>
