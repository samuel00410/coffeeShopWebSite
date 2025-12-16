<template>
  <div v-if="visible" class="toast toast-top toast-end z-50">
    <div
      :class="[
        'border-[3px] rounded-[1.5rem] px-5 py-4 flex items-center gap-4 min-w-[280px] max-w-[420px]',
        toastClass,
      ]"
    >
      <div>
        <img class="w-10 h-10" :src="addCartImgPath" alt="Toast Image" />
      </div>

      <!-- 內容 -->
      <div>
        <p class="text-lg font-extrabold text-[#4A3D2F]">{{ message }}</p>
      </div>

      <!-- 關閉按鈕 -->
      <button @click="hideToast" class="btn btn-sm btn-circle btn-ghost">
        ✕
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import addCartImg from "../../assets/images/Toast/addCartImg.png";
import removeCartImg from "../../assets/images/Toast/removeCartImg.png";

import { ref, computed } from "vue";

type ToastType = "add" | "remove";

const visible = ref(false);
const message = ref("");
const toastType = ref<ToastType>("add");

const addCartImgPath = computed(() => {
  return toastType.value === "add" ? addCartImg : removeCartImg;
});

const toastClass = computed(() => {
  switch (toastType.value) {
    case "add":
      return "bg-linear-to-r from-[#FFF4F0] to-[#FFE8DD] border-[#FFD8C8] shadow-[0_4px_0_0_#FFD8C8]";
    case "remove":
      return "bg-linear-to-r from-[#FFF5E8] to-[#F5EDE3] border-[#E8DBC8] shadow-[0_4px_0_0_#E8DBC8]";
    default:
      return "bg-linear-to-r from-white to-[#FFFEF9] border-[#E8DBC8] shadow-[0_4px_0_0_#E8DBC8]";
  }
});

const hideToast = () => {
  visible.value = false;
};

const showToast = (msg: string, type: ToastType) => {
  message.value = msg;
  toastType.value = type;

  visible.value = true;

  setTimeout(() => {
    visible.value = false;
  }, 3000);
};

defineExpose({
  showToast,
});
</script>

<style scoped></style>
