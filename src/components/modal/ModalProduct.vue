<template> 
    <Transition name="modal-product">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div class="w-96 bg-white flex flex-col gap-y-1 px-2 max-h-screen overflow-y-scroll">
                <div class="flex flex-row justify-between items-center border-b mb-4 p-4">
                    <h2 class="text-2xl font-semibold">Create Product</h2>
                    <button type="button"  class="text-black/50 hover:text-red-600 transition-colors ease" @click="closeModal">
                        <font-awesome-icon icon="fa-solid fa-rectangle-xmark" size="xl" />
                    </button>
                </div>
                <form action="" class="flex flex-col flex-grow min-h-0 gap-y-4 p-4">
                    <div class="flex flex-col">
                        <label for="">Name</label>
                        <input type="text" placeholder="Type here" class="input input-bordered w-full"/>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="">Image</label>
                        <input type="file" class="file-input file-input-bordered w-full" ref="file" @change="uploadProductImage"/>
                        <div v-if="src" class="w-44 overflow-hidden relative">
                            <img :src="src" alt="image-product">
                            <button type="button" class="absolute top-2 right-2">
                                <font-awesome-icon icon="fa-solid fa-circle-xmark" size="lg" @click="removeImage"/>
                            </button>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label for="">Price</label>
                        <input type="number" class="input input-bordered w-full">
                    </div>
                    <div class="flex flex-col">
                        <label for="">Stock</label>
                        <input type="number" class="input input-bordered w-full">
                    </div>
                    <div class="flex flex-col">
                        <label for="">Category</label>
                        <select class="select select-bordered w-full">
                            <option disabled selected>Select category</option>
                            <option>Han Solo</option>
                            <option>Greedo</option>
                        </select>
                    </div>
                    <div class="flex flex-col">
                        <label for="">Description</label>
                        <textarea class="textarea textarea-bordered" placeholder="Bio"></textarea>
                    </div>
                    <div class="flex justify-end py-4">
                        <button class="btn btn-success text-white btn-wide">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    isOpen : {
        type : Boolean,
        default : false
    }
})
const emits = defineEmits(['close'])

const src = ref('')
const file = ref('')


const uploadProductImage = (e) => {
    const file = e.target.files
    src.value = URL.createObjectURL(new Blob(file))
}

const closeModal = ()=>{
    emits('close',!props.isOpen)
}

const removeImage = ()=>{
    file.value.value = null;
    src.value = ''
}
</script>

<style scoped>
/* we will explain what these classes do next! */
.modal-product-enter-active,
.modal-product-leave-active {
  transition: opacity 0.5s ease;
}

.modal-product-enter-from,
.modal-product-leave-to {
  opacity: 0;
}
</style>
