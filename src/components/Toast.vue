<template>
  <Transition name="slide-fade">
    <div v-if="visible" class="toast toast-top toast-end z-50">
      <div class="alert" :class="headerColorClass">
        <!-- 內容 -->
        <div>
          <h3 class="font-bold">{{ currentTitle }}</h3>
          <div class="text-xs">{{ currentMessage }}</div>
        </div>

        <!-- 關閉按鈕 -->
        <button @click="hideToast" class="btn btn-sm btn-circle btn-ghost">
          ✕
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

const visible = ref(false);

const currentTitle = ref("");
const currentMessage = ref("");
const currentType = ref<"success" | "error" | "warning">("success");

const headerColorClass = computed(() => {
  switch (currentType.value) {
    case "success":
      return "alert-success text-white";
    case "error":
      return "alert-error text-white";
    case "warning":
      return "alert-info text-dark";
    default:
      return "";
  }
});

const hideToast = () => {
  visible.value = false;
};

const showToast = (
  title: string,
  message: string,
  type: "success" | "error" | "warning" = "success"
) => {
  currentTitle.value = title;
  currentMessage.value = message;
  currentType.value = type;

  visible.value = true;

  setTimeout(() => {
    visible.value = false;
  }, 3000);
};

defineExpose({
  showToast,
});
</script>
