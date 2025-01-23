<template>
  <section>
    <Transition name="slide">
      <div
        class="fixed grid md:grid-cols-[1fr,auto] max-md:grid-flow-row right-0 max-md:right-72 z-10"
        v-if="isProfile"
        dir="ltr"
      >
        <aside
          class="border h-96 w-74 bg-white md:sticky top-0 fixed z-10 transition-all duration-300"
        >
          <div class="w-full h-full rounded-s-lg">
            <div class="mt-5 mb-2">
              <button class="flex pb-3 ml-auto" @click="closeSidebar">
                <font-awesome-icon
                  :icon="['far', 'rectangle-xmark']"
                  class="h-8 w-8"
                />
              </button>
              <label class="input input-bordered flex items-center gap-2">
                Bio
                <input
                  type="text"
                  class="grow"
                  placeholder="Your Name"
                  v-model="profile.bio"
                />
              </label>
            </div>
            <div class="blocks mb-2">
              <label class="input input-bordered flex items-center gap-2">
                Age
                <input
                  type="number"
                  class="grow"
                  placeholder="Your Age"
                  v-model="profile.age"
                />
              </label>
            </div>
            <input
              type="file"
              class="file-input w-full max-w-xs"
              @change="uploadProfileImage"
            />
            <button
              type="submit"
              @click="handleProfile"
              class="bg bg-info mx-auto flex border rounded-xl w-24 mt-3"
            >
              Update Profile
            </button>
          </div>
        </aside>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStorage";
import { reactive } from "vue";

const profile = reactive({
  bio: "",
  age: 0,
  image: null,
});

const store = useAuthStore();

// console.log(store.tokenUser);
// const src = reactive("");
// const image = ref(null);
const uploadProfileImage = (e) => {
  // image.value = e.target.files[0];
  profile.image = e.target.files[0];
};

console.log(uploadProfileImage);
const handleProfile = async () => {
  try {
    const formData = new FormData();
    formData.append("bio", profile.bio);
    formData.append("age", profile.age);
    if (profile.image) {
      formData.append("image", profile.image);
    }

    const response = await store.profileUser(formData);
    console.log("Profile updated:", response);
  } catch (error) {
    console.error("Error updating profile:", error);
    if (error.response) {
      console.error("Server response:", error.response.data);
    }
  }
};

const props = defineProps({
  isProfile: {
    type: Boolean,
    defaults: false,
  },
});

const emit = defineEmits(["update:isProfile"]);
const closeSidebar = () => {
  emit("update:isProfile", false);
};
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
