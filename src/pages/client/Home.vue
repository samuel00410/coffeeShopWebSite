<template>
  <HeroSection />
  <PromotionSection />
  <AboutSection id="about" />
  <FeaturedMenuSection />
  <mapSection />
</template>

<script setup lang="ts">
import type { ToastType } from "../../types/clientToast";
import HeroSection from "../../components/client/HeroSection.vue";
import PromotionSection from "../../components/client/PromotionSection.vue";
import FeaturedMenuSection from "../../components/client/featuredMenuSection.vue";
import AboutSection from "../../components/client/AboutSection.vue";
import mapSection from "../../components/client/mapSection.vue";
import { useCartStore } from "../../stores/cart";
import { inject, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const toast = inject<{
  showCartMsg(msg: string, type: ToastType): void;
}>("toast");

const cartStore = useCartStore();

onMounted(async () => {
  if (route.query.showEmptyCartMsg === "true") {
    await cartStore.getCart();

    if (cartStore.isEmpty) {
      toast?.showCartMsg("建立訂單失敗: 請先點餐唷！", "info");
    }
  }
});
</script>

<style scoped></style>
