<template>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Total Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody v-for="order in orders">
        <!-- row 1 -->
        <tr>
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12">
                  <img :src="order.product.image" alt="productImage" />
                </div>
              </div>
              <div>
                <div class="font-bold">{{ order.product.name }}</div>
                <div class="text-sm opacity-50">
                  {{ formatterRupiah.formatPriceToIDR(order.product.price) }}
                </div>
              </div>
            </div>
          </td>
          <td>
            {{ order.quantity }}
          </td>
          <td>{{ formatterRupiah.formatPriceToIDR(order.total_price) }}</td>
          <td>{{ order.status }}</td>
          <th>
            <button
              class="btn btn-ghost btn-xs"
              @click="snapOpen(order.snap_token)"
            >
              Info
            </button>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { apiClient } from "@/services/apiClient";
import formatterRupiah from "@/services/formatterRupiah";
import { sha512 } from "js-sha512";
import { onMounted, ref } from "vue";

const orders = ref([]);

const getOrderList = async () => {
  try {
    const userToken = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.id);
    console.log(`Bearer ${userToken}`);

    const response = await apiClient.get(`auth/me?id=${user.id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    orders.value = response.data.data.orders;

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const userToken = ref(
  localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null
);
const snapOpen = (id) => {
  const SERVER_KEY_MIDTRANS = import.meta.env.VITE_MIDTRANS_SERVER_KEY;

  return window.snap.pay(id, {
    onSuccess: async function (result) {
      try {
        const server_key = sha512(
          result.order_id +
            result.status_code +
            result.gross_amount +
            SERVER_KEY_MIDTRANS
        );
        console.log(server_key);
        const response = await apiClient.post(
          "midtrans/webhook",
          {
            order_id: result.order_id,
            status_code: result.status_code,
            gross_amount: result.gross_amount,
            signature_key: server_key,
            transaction_status: result.transaction_status,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken.value}`,
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        await getOrderList();
      }
    },
    onPending: async function (result) {
      console.log(result);
      try {
        const server_key = sha512(
          result.order_id +
            result.status_code +
            result.gross_amount +
            SERVER_KEY_MIDTRANS
        );
        console.log(server_key);
        const response = await apiClient.post(
          "midtrans/webhook",
          {
            order_id: result.order_id,
            status_code: result.status_code,
            gross_amount: result.gross_amount,
            signature_key: server_key,
            transaction_status: result.transaction_status,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken.value}`,
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        await getOrderList();
      }
    },
    onError: async function (result) {
      try {
        const server_key = sha512(
          result.order_id +
            result.status_code +
            result.gross_amount +
            SERVER_KEY_MIDTRANS
        );
        console.log(server_key);
        const response = await apiClient.post(
          "midtrans/webhook",
          {
            order_id: result.order_id,
            status_code: result.status_code,
            gross_amount: result.gross_amount,
            signature_key: server_key,
            transaction_status: result.transaction_status,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken.value}`,
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        await getOrderList();
      }
    },
    onClose: async function () {
      console.log("customer closed the popup without finishing the payment");
    },
  });
};

onMounted(() => {
  getOrderList();
});
</script>
