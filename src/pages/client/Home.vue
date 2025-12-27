<template>
  <HeroSection />
  <PromotionSection />
  <AboutSection id="about" />
  <FeaturedMenuSection />
</template>

<script setup lang="ts">
import HeroSection from "../../components/client/HeroSection.vue";
import PromotionSection from "../../components/client/PromotionSection.vue";
import FeaturedMenuSection from "../../components/client/featuredMenuSection.vue";
import AboutSection from "../../components/client/AboutSection.vue";
import { inject, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const toast = inject<{
  showCartMsg(msg: string): void;
}>("toast");

onMounted(() => {
  console.log("route:", route);
  if (route.query.showEmptyCartMsg === "true") {
    toast?.showCartMsg("糟糕~ 購物車為空，請先點餐唷！");
  }
});
</script>

<style scoped></style>
