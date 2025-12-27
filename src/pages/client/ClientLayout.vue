<template>
  <div class="min-h-screen bg-hero-bottom flex flex-col">
    <ClientNavbar />

    <main class="flex-1">
      <router-view />
    </main>

    <Footer />
  </div>
  <CartDrawer />
  <ClientToast ref="toastRef" />
</template>

<script setup lang="ts">
import type { ToastType } from "../../types/clientToast";
import ClientNavbar from "../../components/ClientNavbar.vue";
import Footer from "../../components/client/Footer.vue";
import ClientToast from "../../components/client/ClientToast.vue";
import CartDrawer from "../../components/client/CartDrawer.vue";
import { ref, provide } from "vue";

const toastRef = ref<InstanceType<typeof ClientToast> | null>(null);

provide("toast", {
  showCartMsg(msg: string, type: ToastType) {
    toastRef.value?.showToast(msg, type);
  },
});
</script>
