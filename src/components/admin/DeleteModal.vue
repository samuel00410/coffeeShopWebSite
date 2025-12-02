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
        刪除產品
      </h3>
      <p class="py-4">
        是否刪除該產品
        <span class="font-semibold">{{ tempProduct?.title }}</span
        >？
      </p>
      <p class="text-sm text-error">⚠️ 刪除後將無法恢復</p>
      <div class="modal-action">
        <button class="btn" @click="closeModal">取消</button>
        <button class="btn btn-error" @click="deleteProduct">
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          確認刪除
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="closeModal">close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import type { Product } from "../types/product";
import axios from "axios";
import { ref, inject } from "vue";

const emit = defineEmits<{
  (e: "refresh"): void;
}>();

const toast = inject<{
  showSuccess(title: string, message: string): void;
  showError(title: string, message: string): void;
}>("toast");

const modalEl = ref<HTMLDialogElement | null>(null);
const tempProduct = ref<Product | null>(null);

const openDeleteModal = (product: Product) => {
  tempProduct.value = product;
  modalEl.value?.showModal();
};

const closeModal = () => {
  modalEl.value?.close();
};

const deleteProduct = async () => {
  try {
    if (!tempProduct.value) return;
    const token = localStorage.getItem("hexToken");
    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/${
        import.meta.env.VITE_API_PATH
      }/admin/product/${tempProduct.value.id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (res.data.success) {
      emit("refresh");
      toast?.showSuccess("刪除產品成功", "產品已成功刪除");
    }
  } catch (error) {
    console.error("刪除產品失敗:", error);
    toast?.showError("刪除產品失敗", "產品刪除失敗，請稍後再試");
  } finally {
    closeModal();
  }
};

defineExpose({
  openDeleteModal,
});
</script>
