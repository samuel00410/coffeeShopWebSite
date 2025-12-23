<template>
  <dialog ref="modalEl" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg text-error mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="inline h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        刪除優惠券
      </h3>
      <p class="py-4">是否刪除該優惠券 ?</p>
      <p class="text-sm text-error">⚠️ 刪除後將無法恢復</p>
      <div class="modal-action">
        <button class="btn" @click="closeModal">取消</button>
        <button class="btn btn-error" @click="deleteOrder">確認刪除</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="closeModal">close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import type { iCoupon } from "../../../types/coupon";
import api from "../../../utils/api";
import { ref, inject } from "vue";

const emit = defineEmits<{
  (e: "refresh"): void;
}>();

const toast = inject<{
  showSuccess(title: string, message: string): void;
  showError(title: string, message: string): void;
}>("toast");

const modalEl = ref<HTMLDialogElement | null>(null);
const tempCoupon = ref<iCoupon | undefined>(undefined);

const openDeleteModal = (coupon: iCoupon) => {
  tempCoupon.value = coupon;
  modalEl.value?.showModal();
};

const closeModal = () => {
  modalEl.value?.close();
};

const deleteOrder = async () => {
  if (!tempCoupon.value) return;

  try {
    const res = await api.delete(
      `/api/${import.meta.env.VITE_API_PATH}/admin/coupon/${
        tempCoupon.value.id
      }`
    );
    if (res.data.success) {
      emit("refresh");
      toast?.showSuccess("刪除優惠券成功", "優惠券已成功刪除");
    }
  } catch (err) {
    console.error("刪除優惠券失敗:", err);
    toast?.showError("刪除優惠券失敗", "優惠券刪除失敗，請稍後再試");
  } finally {
    closeModal();
  }
};

defineExpose({
  openDeleteModal,
});
</script>
