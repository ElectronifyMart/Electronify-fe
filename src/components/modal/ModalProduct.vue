<template>
  <Transition name="modal-product">
    <div
      v-if="isOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
    >
      <div
        class="w-96 bg-white flex flex-col gap-y-1 px-2 max-h-screen overflow-y-scroll"
      >
        <div
          class="flex flex-row justify-between items-center border-b mb-4 p-4"
        >
          <h2 class="text-2xl font-semibold">
            {{ isSubmit ? "Create Product" : "Update Product" }}
          </h2>
          <button
            type="button"
            class="text-black/50 hover:text-red-600 transition-colors ease"
            @click="closeModal"
          >
            <font-awesome-icon icon="fa-solid fa-rectangle-xmark" size="xl" />
          </button>
        </div>
        <form
          @submit.prevent="createOrUpdateProduct"
          class="flex flex-col flex-grow min-h-0 gap-y-4 p-4"
          enctype="multipart/form-data"
        >
          <div class="flex flex-col">
            <label for="name">Name</label>
            <input
              v-model="payload.name"
              id="name"
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full"
            />
            <p
              class="text-[11px] border text-red-500 font-bold placeholder-white/70"
              v-for="(error, index) of v$.name.$errors"
              :key="index"
            >
              {{ `*${error.$message}` }}
            </p>
          </div>
          <div class="flex flex-col gap-2">
            <label for="">Image</label>
            <input
              type="file"
              class="file-input file-input-bordered w-full"
              ref="file"
              @change="uploadProductImage"
            />
            <div v-if="src" class="w-full h-44 overflow-hidden relative">
              <img
                :src="src"
                alt="image-product"
                class="w-full h-full object-cover"
              />
              <button type="button" class="absolute top-2 right-2">
                <font-awesome-icon
                  icon="fa-solid fa-circle-xmark"
                  size="lg"
                  @click="removeImage"
                />
              </button>
            </div>
          </div>
          <div class="flex flex-col">
            <label for="price">Price</label>
            <input
              v-model="payload.price"
              id="price"
              type="number"
              class="input input-bordered w-full"
            />
          </div>
          <div class="flex flex-col">
            <label for="stock">Stock</label>
            <input
              v-model="payload.stock"
              id="stock"
              type="number"
              class="input input-bordered w-full"
            />
          </div>
          <div class="flex flex-col">
            <label for="category">Category</label>
            <select
              id="category"
              v-model="payload.category"
              class="select select-bordered w-full"
            >
              <option disabled selected>Select category</option>
              <option :value="category.id" v-for="category in data">
                {{ category.name }}
              </option>
            </select>
            <p
              class="text-[11px] border text-red-500 font-bold placeholder-white/70"
              v-for="(error, index) of v$.category.$errors"
              :key="index"
            >
              {{ `*${error.$message}` }}
            </p>
          </div>
          <div class="flex flex-col">
            <label for="desc">Description</label>
            <textarea
              v-model="payload.description"
              id="desc"
              class="textarea textarea-bordered"
              placeholder="Bio"
            ></textarea>
          </div>
          <div class="flex justify-end py-4">
            <button
              class="btn btn-success text-white btn-wide"
              type="submit"
              v-if="isSubmit"
            >
              <span v-if="!isLoading">Submit</span>
              <span v-else class="loading loading-spinner loading-lg"></span>
            </button>
            <button
              class="btn btn-info text-white btn-wide"
              type="submit"
              v-else
            >
              <span v-if="!isLoading">Update</span>
              <span v-else class="loading loading-spinner loading-lg"></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { apiClient } from "@/services/apiClient";
import { useCategoryStore } from "@/stores/categoryStore";
import { useProductStore } from "@/stores/productStore";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import {
  computed,
  onMounted,
  reactive,
  ref,
  shallowReactive,
  watch,
} from "vue";

const productStore = useProductStore();
const categoryStore = useCategoryStore();

const payload = reactive({
  name: "",
  image: "",
  price: 0,
  stock: 0,
  description: "",
  category: "",
});

const rules = computed(() => ({
  name: { required },
  category: { required },
}));
const v$ = useVuelidate(rules, payload);
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  isSubmit: {
    type: Boolean,
    default: true,
  },
  item: {
    type: Object,
    default: {},
  },
});

const edit = computed(() => {
  console.log(props.item);
  return props.item;
});
const emits = defineEmits(["close", "getInfo"]);

const src = ref("");
const file = ref("");
const tokenUser = ref(
  localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null
);

const isLoading = ref(false);

const uploadProductImage = (e) => {
  const file = e.target.files;
  src.value = URL.createObjectURL(new Blob(file));
  payload.image = file[0];
};

const initialPayload = shallowReactive({ ...payload });

const closeModal = () => {
  emits("close", false);

  return Object.assign(payload, initialPayload);
};

const removeImage = () => {
  file.value.value = null;
  src.value = "";
};

const categories = ref([]);

const data = computed(() => categories.value);

const getCategory = async () => {
  try {
    const res = await categoryStore.getCategories();
    categories.value = res.data;
    console.log(categories.value);
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) return;
  isLoading.value = !isLoading.value;
  try {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("image", payload.image);
    formData.append("price", payload.price);
    formData.append("stock", payload.stock);
    formData.append("category_id", payload.category);
    formData.append("description", payload.description);

    console.log(response);
  } catch (error) {
    console.log(error);
    emits("getInfo", { status: "error", message: error });
  } finally {
    isLoading.value = !isLoading.value;
    closeModal();
  }
};

const createOrUpdateProduct = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) return;
  isLoading.value = !isLoading.value;
  let response;

  try {
    const formData = new FormData();
    formData.append("name", payload.name);
    if (payload.image) {
      formData.append("image", payload.image);
    }
    formData.append("price", payload.price);
    formData.append("stock", payload.stock);
    formData.append("category_id", payload.category);
    formData.append("description", payload.description);
    if (props.isSubmit) {
      response = await productStore.createProduct(formData);
    } else {
      formData.append("_method", "PUT");
      response = await apiClient.post(`/product/${props.item.id}`, formData, {
        headers: {
          Authorization: `Bearer ${tokenUser.value}`,
        },
      });
    }

    console.log(response);
  } catch (error) {
    console.log(error);
    emits("getInfo", { status: "error", message: error });
  } finally {
    isLoading.value = !isLoading.value;
    closeModal();
  }
};

watch(
  () => {
    return props.item;
  },
  () => {
    payload.name = props.item.name;
    payload.category = props.item.category_id;
    payload.description = props.item.description;
    payload.price = props.item.price;
    src.value = props.item.image;
    payload.stock = props.item.stock;
  }
);

onMounted(async () => {
  await getCategory();
});
</script>

<style scoped>
.modal-product-enter-active,
.modal-product-leave-active {
  transition: opacity 0.5s ease;
}

.modal-product-enter-from,
.modal-product-leave-to {
  opacity: 0;
}
</style>
