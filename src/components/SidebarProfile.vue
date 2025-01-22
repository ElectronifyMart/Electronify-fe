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
            <div class="mt-5 mb-10">
              <button class="flex pb-3 ml-auto" @click="closeSidebar">
                <font-awesome-icon
                  :icon="['far', 'rectangle-xmark']"
                  class="h-8 w-8"
                />
              </button>
              <label class="input input-bordered flex items-center gap-2">
                Bio
                <input type="text" class="grow" placeholder="Your Name" />
              </label>
            </div>
            <div class="blocks mb-10">
              <label class="input input-bordered flex items-center gap-2">
                Age
                <input type="text" class="grow" placeholder="Your Age" />
              </label>
            </div>
            <input type="file" class="file-input w-full max-w-xs" />
          </div>
        </aside>
      </div>
    </Transition>
  </section>
</template>

<script setup>
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
