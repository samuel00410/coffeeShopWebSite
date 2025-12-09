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
import { ref, provide, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

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

// 檢查使用者是否已登入
const checkLogin = async () => {
  const token = localStorage.getItem("hexToken");
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const res = await axios.post(
      `${apiUrl}/api/user/check`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (!res.data.success) {
      router.push("/login");
    }
  } catch (err) {
    console.error("驗證失敗:", err);
    router.push("/login");
  }
};

onMounted(() => {
  checkLogin();
});
</script>
