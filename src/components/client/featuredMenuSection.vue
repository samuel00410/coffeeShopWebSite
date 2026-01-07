<template>
  <section ref="sectionRef" class="featured-menu-section bg-hero-bottom">
    <div class="container mx-auto py-12 text-center">
      <!-- 文字區塊 -->
      <div
        class="mb-16 flex-col items-center justify-center"
        :class="{ 'animate-text-in': isVisible }"
      >
        <div
          class="mb-10 inline-flex items-center gap-2 bg-white shadow-[0_6px_0_0_#E8DBC8] border-4 border-[#4A3D2F] rounded-full px-[16px] py-[8px] -rotate-2"
        >
          <div class="w-10 h-10">
            <img :src="titleImg" class="w-full h-auto rotate-y-180" />
          </div>
          <p class="text-lg font-black text-[#4A3D2F]">推薦菜單</p>
          <div class="w-10 h-10">
            <img :src="titleImg" class="w-full h-auto" />
          </div>
        </div>

        <div class="flex items-start justify-center gap-2">
          <h2 class="mb-6 rotate-1 text-4xl font-black text-black">本週特選</h2>
          <SparklesIcon class="h-12 w-12 text-amber-400" />
        </div>

        <p className="text-[#6B5444] text-xl font-bold">
          用心製作的特別菜單請您品嚐
        </p>
      </div>

      <!-- 菜單卡片區塊 -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 place-items-center"
      >
        <FeaturedCard
          v-for="(item, index) in cardData"
          :key="item.id"
          :card="item"
          :width="400"
          :class="{ 'animate-card-in': isVisible }"
          :style="{
            animationDelay: isVisible ? `${0.5 + index * 0.25}s` : '0s',
          }"
          @view-detail="goProductPage"
          @add-to-cart="addToCart"
          :disabled="status.loadingItem === item.id"
        />
      </div>

      <button
        class="btn-primary px-6 py-6"
        :class="{ 'animate-btn-in': isVisible }"
        @click="$router.push({ name: 'Menu' })"
      >
        查看完整菜單 →
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ToastType } from "../../types/clientToast";
import { useCartStore } from "../../stores/cart";
import { ref, onMounted, watch, inject } from "vue";
import { useElementVisibility } from "@vueuse/core";
import { SparklesIcon } from "@heroicons/vue/24/solid";
import titleImg from "../../assets/images/featuredMenu/s0134_31_1.png";
import feProduct1 from "../../assets/images/featuredMenu/feProduct1.jpg";
import feProduct2 from "../../assets/images/featuredMenu/feProduct2.jpg";
import feProduct3 from "../../assets/images/featuredMenu/feProduct3.jpg";
import FeaturedCard from "./FeaturedCard.vue";
import { useRouter } from "vue-router";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

const toast = inject<{
  showCartMsg(msg: string, type: ToastType): void;
}>("toast");

const cartStore = useCartStore();

const router = useRouter();

onMounted(() => {
  getFeaturedProducts();
});

const cardData: any = ref([]);

const status = ref({
  loadingItem: "",
});
const sectionRef = ref<HTMLElement | null>(null);
const isVisible = useElementVisibility(sectionRef);

const getFeaturedProducts = async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/${apiPath}/products/all`);
    if (res.data.success) {
      const allProducts = res.data.products;
      // 從所有產品中隨機選擇三個
      cardData.value = getRandomProducts(allProducts, 3);
    }
  } catch (error) {
    console.error("取得特選商品失敗", error);
  }
};

const getRandomProducts = (products: any[], count: number) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const addToCart = async (productId: string) => {
  try {
    status.value.loadingItem = productId;
    const res = await axios.post(`${apiUrl}/api/${apiPath}/cart`, {
      data: { product_id: productId, qty: 1 },
    });

    if (res.data.success) {
      status.value.loadingItem = "";
      toast?.showCartMsg("已成功加入購物車！", "success");
      cartStore.getCart();
    }
  } catch (err) {
    console.error("加入購物車失敗:", err);
  }
};

const goProductPage = (productId: string) => {
  router.push({ name: "ProductDetail", params: { productId } });
};
</script>

<style scoped>
/* 文字區塊動畫 */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 卡片動畫 */
@keyframes fadeInCard {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 按鈕動畫 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-text-in {
  animation: fadeInLeft 1.5s ease forwards;
  animation-delay: 0s;
  opacity: 0;
}

.animate-card-in {
  animation: fadeInCard 2.5s ease forwards;
  opacity: 0;
}

.animate-btn-in {
  animation: fadeInUp 1.5s ease forwards;
  animation-delay: 1s;
  opacity: 0;
}
</style>
