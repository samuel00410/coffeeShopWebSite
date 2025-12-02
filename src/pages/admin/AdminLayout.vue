<template>
  <AdminNavbar />
  <div class="p-4">
    <router-view />
  </div>
  <Toast ref="toastRef" />
</template>

<script setup lang="ts">
import AdminNavbar from "../../components/AdminNavbar.vue";
import Toast from "../../components/Toast.vue";
import { ref, provide } from "vue";

const toastRef = ref<InstanceType<typeof Toast> | null>(null);

provide("toast", {
  showSuccess(title: string, message: string) {
    toastRef.value?.showToast(title, message, "success");
  },
  showError(title: string, message: string) {
    toastRef.value?.showToast(title, message, "error");
  },
  showWarning(title: string, message: string) {
    toastRef.value?.showToast(title, message, "warning");
  },
});
</script>
