<template>
  <div class="mb-6">
    <h2>訂單管理</h2>
  </div>
  <div class="overflow-x-auto">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="tableData.length === 0 && !isLoading">
          <td colspan="6" class="text-center">目前沒有訂單資料</td>
        </tr>
        <tr v-else v-for="order in tableData" :key="order.id">
          <td>{{ formatDate(order.create_at) }}</td>
          <td>{{ order.user.email }}</td>
          <td class="whitespace-pre-wrap">
            {{ formatProductList(order.products) }}
          </td>
          <td>{{ order.total }}</td>
          <td>{{ order.is_paid ? "已付款" : "未付款" }}</td>
          <td>
            <div class="flex gap-2">
              <button @click="openModal(order)" class="btn btn-sm btn-info">
                檢視
              </button>
              <button
                class="btn btn-sm btn-error"
                @click="openDeleteModal(order)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <Loading :active="isLoading" />
  <OrderViewModal ref="orderViewModalEl" />
  <DeleteModal ref="orderDeleteModalEl" @refresh="getOrders" />
  <Pagination :pages="pagination" @pageChanged="updatePage" />
</template>

<script setup lang="ts">
import type { Tpagination } from "../../types/product";
import { ref, onMounted } from "vue";
import { formatDate, formatProductList } from "../../utils/format";
import api from "../../utils/api";
import OrderViewModal from "../../components/admin/order/OrderViewModal.vue";
import DeleteModal from "../../components/admin/order/DeleteModal.vue";
import Pagination from "../../components/admin/Pagination.vue";

onMounted(() => {
  getOrders();
});

const isLoading = ref(false);
const pagination = ref<Tpagination>({});
const tableData = ref<any[]>([]);
const orderViewModalEl = ref<InstanceType<typeof OrderViewModal> | null>(null);
const orderDeleteModalEl = ref<InstanceType<typeof DeleteModal> | null>(null);

// 取得訂單列表
const getOrders = async (page = 1) => {
  try {
    isLoading.value = true;
    const res = await api.get(
      `/api/${import.meta.env.VITE_API_PATH}/admin/orders?page=${page}`
    );

    if (res.data.success) {
      if (res.data.orders) {
        tableData.value = res.data.orders;
        pagination.value = res.data.pagination;
      } else {
        console.warn("訂單資料不存在，可能沒有訂單紀錄。");
        tableData.value = [];
      }
    }
  } catch (err) {
    console.error("取得訂單資料失敗:", err);
    tableData.value = [];
  } finally {
    isLoading.value = false;
  }
};

const updatePage = (page: number) => {
  getOrders(page);
};

const openModal = (order: any) => {
  orderViewModalEl.value?.openModal(order);
};

const openDeleteModal = (order: any) => {
  orderDeleteModalEl.value?.openDeleteModal(order);
};
</script>
