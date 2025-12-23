<template>
  <dialog ref="modalEl" class="modal">
    <div class="modal-box max-w-5xl">
      <!-- 標題 -->
      <h3 class="font-bold mb-4">訂單細節</h3>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 左側：用戶資料 -->
        <div>
          <h4 class="font-semibold mb-4">用戶資料</h4>
          <div class="space-y-3">
            <div class="flex">
              <label class="w-20 text-gray-600">姓名</label>
              <span>{{ orderData.user.name }}</span>
            </div>
            <div class="flex">
              <label class="w-20 text-gray-600">Email</label>
              <span>{{ orderData.user.email }}</span>
            </div>
            <div class="flex">
              <label class="w-20 text-gray-600">電話</label>
              <span>{{ orderData.user.tel }}</span>
            </div>
            <div class="flex">
              <label class="w-20 text-gray-600">地址</label>
              <span>{{ orderData.user.address }}</span>
            </div>
          </div>
        </div>

        <div>
          <!-- 右側：訂單細節 -->
          <div class="mb-6">
            <h4 class="font-semibold mb-4">訂單細節</h4>
            <div class="space-y-3">
              <div class="flex">
                <label class="w-24 text-gray-600">訂單編號</label>
                <span>{{ orderData.id }}</span>
              </div>
              <div class="flex">
                <label class="w-24 text-gray-600">下單時間</label>
                <span>{{ formatDate(orderData.create_at) }}</span>
              </div>
              <div class="flex">
                <label class="w-24 text-gray-600">付款時間</label>
                <span>{{
                  orderData.paid_date ? formatDate(orderData.paid_date) : "-"
                }}</span>
              </div>
              <div class="flex">
                <label class="w-24 text-gray-600">付款狀態</label>
                <span
                  :class="orderData.is_paid ? 'text-success' : 'text-error'"
                >
                  {{ orderData.is_paid ? "已付款" : "未付款" }}
                </span>
              </div>
              <div class="flex">
                <label class="w-24 text-gray-600">總金額</label>
                <span>{{ orderData.total?.toLocaleString() }}</span>
              </div>
            </div>
          </div>

          <!-- 選購商品區塊 -->
          <div>
            <h4 class="font-semibold mb-4">選購商品</h4>
            <div class="overflow-x-auto">
              <table class="table w-full">
                <tbody>
                  <tr v-for="(product, key) in orderData.products" :key="key">
                    <td>商品名稱</td>
                    <td class="text-right">
                      {{ product.qty }}/{{ product.unit || "件" }}
                    </td>
                    <td class="text-right">
                      {{ product.total?.toLocaleString() }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部按鈕 -->
      <div class="modal-action">
        <button class="btn" @click="closeModal">取消</button>
        <button class="btn btn-primary" @click="closeModal">確認</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="closeModal">close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { formatDate } from "../../../utils/format";

const modalEl = ref<HTMLDialogElement | null>(null);
const orderData = ref({
  user: {},
  products: {},
  create_at: 0,
  id: "",
  is_paid: false,
  paid_date: 0,
  total: 0,
});

const openModal = (order: any) => {
  orderData.value = order;
  modalEl.value?.showModal();
};

const closeModal = () => {
  modalEl.value?.close();
};

defineExpose({
  openModal,
});
</script>
