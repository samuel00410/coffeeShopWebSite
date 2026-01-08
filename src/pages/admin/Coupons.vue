<template>
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold">優惠券</h2>
    <button class="btn btn-primary" @click="openModal(true)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 4v16m8-8H4"
        />
      </svg>
      新增優惠券
    </button>
  </div>
  <div class="overflow-x-auto">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折購百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="tableData.length === 0 && !isLoading">
          <td colspan="6" class="text-center">目前沒有優惠券資料</td>
        </tr>
        <tr v-for="coupon in tableData" :key="coupon.id">
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.percent }}</td>
          <td>{{ formatDate(coupon.due_date) }}</td>
          <td>{{ coupon.is_enabled ? "啟用" : "停用" }}</td>
          <td>
            <div class="flex gap-2">
              <button
                @click="openModal(false, coupon)"
                class="btn btn-sm btn-info"
              >
                編輯
              </button>
              <button
                class="btn btn-sm btn-error"
                @click="openDeleteModal(coupon)"
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
  <CouponModal
    :coupon="tempCoupon"
    ref="CouponModalRef"
    @refresh="getCoupons"
  />
  <DeleteModal ref="DeleteModalRef" @refresh="getCoupons" />
  <Pagination :pages="pagination" @pageChanged="updatePage" />
</template>

<script setup lang="ts">
import type { Tpagination } from "../../types/product";
import type { iCoupon } from "../../types/coupon";
import { ref, onMounted } from "vue";
import { formatDate } from "../../utils/format";
import api from "../../utils/api";
import CouponModal from "../../components/admin/coupon/CouponModal.vue";
import DeleteModal from "../../components/admin/coupon/DeleteModal.vue";
import Pagination from "../../components/admin/Pagination.vue";

onMounted(() => {
  getCoupons();
});

const CouponModalRef = ref<InstanceType<typeof CouponModal> | null>(null);
const DeleteModalRef = ref<InstanceType<typeof DeleteModal> | null>(null);
const tableData = ref<iCoupon[]>([]);
const tempCoupon = ref<iCoupon | undefined>(undefined);
const pagination = ref<Tpagination>({});
const isLoading = ref(false);

const getCoupons = async (page = 1) => {
  isLoading.value = true;
  try {
    const res = await api.get(
      `/api/${import.meta.env.VITE_API_PATH}/admin/coupons?page=${page}`
    );
    if (res.data.success) {
      tableData.value = res.data.coupons;
      pagination.value = res.data.pagination;
    }
  } catch (err) {
    console.error("取得優惠券失敗:", err);
  } finally {
    isLoading.value = false;
  }
};

const updatePage = (page: number) => {
  getCoupons(page);
};

const openModal = (isNew: boolean, coupon?: iCoupon) => {
  if (isNew) {
    tempCoupon.value = undefined;
  } else if (coupon) {
    tempCoupon.value = { ...coupon };
  }

  CouponModalRef.value?.openModal();
};

const openDeleteModal = (coupon: iCoupon) => {
  DeleteModalRef.value?.openDeleteModal(coupon);
};
</script>
