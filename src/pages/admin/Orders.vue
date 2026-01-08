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
        <tr v-if="tableData.length === 0">
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

  <OrderViewModal ref="orderViewModalEl" />
  <DeleteModal ref="orderDeleteModalEl" @refresh="getOrders" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { formatDate, formatProductList } from "../../utils/format";
import api from "../../utils/api";
import OrderViewModal from "../../components/admin/order/OrderViewModal.vue";
import DeleteModal from "../../components/admin/order/DeleteModal.vue";

onMounted(() => {
  getOrders();
  // loadMockData();
});

const tableData = ref<any[]>([]);
const orderViewModalEl = ref<InstanceType<typeof OrderViewModal> | null>(null);
const orderDeleteModalEl = ref<InstanceType<typeof DeleteModal> | null>(null);

// 假資料
const loadMockData = () => {
  tableData.value = [
    {
      create_at: 1712563200,
      id: "-L9u2EUkQSoEmW7QzGLF",
      is_paid: true,
      message: "請使用環保杯裝",
      paid_date: 1712563924,
      payment_method: "credit_card",
      products: {
        L8nBrq8Ym4ARI1Kog4t: {
          id: "L8nBrq8Ym4ARI1Kog4t",
          product_id: "-L8moRfPlDZZ2e-1ritQ",
          qty: "2",
        },
        L8nBrq8Ym4ARI1Kog5u: {
          id: "L8nBrq8Ym4ARI1Kog5u",
          product_id: "-L8moRfPlDZZ2e-1ritR",
          qty: "1",
        },
      },
      total: 250,
      user: {
        address: "台北市信義區",
        email: "test@gmail.com",
        name: "王小明",
        tel: "0912345678",
      },
      num: 1,
    },
    {
      create_at: 1712476800,
      id: "-L9u11NAE0m0SpSBUDIq",
      is_paid: false,
      message: "不要加糖",
      payment_method: "cash",
      products: {
        L8nBrq8Ym4ARI1Kog4t: {
          id: "L8nBrq8Ym4ARI1Kog4t",
          product_id: "-L8moRfPlDZZ2e-1ritQ",
          qty: "1",
        },
      },
      total: 120,
      user: {
        address: "高雄市前鎮區",
        email: "user123@gmail.com",
        name: "李小華",
        tel: "0923456789",
      },
      num: 2,
    },
    {
      create_at: 1712390400,
      id: "-L9u3FVlRToFmX8RzHMG",
      is_paid: true,
      message: "",
      paid_date: 1712390600,
      payment_method: "credit_card",
      products: {
        L8nBrq8Ym4ARI1Kog6v: {
          id: "L8nBrq8Ym4ARI1Kog6v",
          product_id: "-L8moRfPlDZZ2e-1ritS",
          qty: "3",
        },
      },
      total: 360,
      user: {
        address: "台中市西屯區",
        email: "chen.user@gmail.com",
        name: "陳大文",
        tel: "0934567890",
      },
      num: 3,
    },
  ];
};

// 取得訂單列表
const getOrders = async () => {
  try {
    const res = await api.get(
      `/api/${import.meta.env.VITE_API_PATH}/admin/orders?page=1`
    );

    if (res.data.success) {
      if (res.data.orders) {
        tableData.value = res.data.orders;
      } else {
        console.warn("訂單資料不存在，可能沒有訂單紀錄。");
        tableData.value = [];
      }
    }
  } catch (err) {
    console.error("取得訂單資料失敗:", err);
    tableData.value = [];
  }
};

const openModal = (order: any) => {
  orderViewModalEl.value?.openModal(order);
};

const openDeleteModal = (order: any) => {
  orderDeleteModalEl.value?.openDeleteModal(order);
};
</script>
