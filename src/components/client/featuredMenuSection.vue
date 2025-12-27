<template>
  <section ref="sectionRef" class="featured-menu-section bg-hero-bottom">
    <div class="container mx-auto py-12 text-center">
      <!-- 文字區塊 -->
      <div ref="textRef">
        <Transition name="text-fade">
          <div
            v-if="isTextVisible"
            class="mb-16 flex-col items-center justify-center"
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
              <h2 class="mb-6 rotate-1 text-4xl font-black text-black">
                本週特選
              </h2>
              <SparklesIcon class="h-12 w-12 text-amber-400" />
            </div>

            <p className="text-[#6B5444] text-xl font-bold">
              用心製作的特別菜單請您品嚐
            </p>
          </div>
        </Transition>
      </div>

      <!-- 菜單卡片區塊 -->
      <TransitionGroup
        name="fade"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 place-items-center"
      >
        <FeaturedCard
          v-for="(item, index) in isCardVisible ? cardData : []"
          :key="item.id"
          :card="item"
          :width="400"
          :style="{ transitionDelay: `${index * 0.25}s` }"
          @view-detail="goProductPage"
          @add-to-cart="addToCart"
          :disabled="status.loadingItem === item.id"
        />
      </TransitionGroup>

      <div ref="btnRef">
        <Transition name="btn-fade">
          <button
            v-if="isBtnVisible"
            class="btn-primary px-6 py-6"
            @click="$router.push({ name: 'Menu' })"
          >
            查看完整菜單 →
          </button>
        </Transition>
      </div>
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
const textRef = ref<HTMLElement | null>(null);
const btnRef = ref<HTMLElement | null>(null);
const isCardVisible = useElementVisibility(sectionRef);
const isTextVisible = useElementVisibility(textRef);
const isBtnVisible = useElementVisibility(btnRef);

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
/*  標題文字動畫 */
.text-fade-enter-active,
.text-fade-leave-active {
  transition: opacity 1.5s ease, transform 1.5s ease;
}
.text-fade-enter-from,
.text-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.text-fade-enter-to,
.text-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/*  卡片動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2.5s ease, transform 2.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/*  按鈕動畫 */
.btn-fade-enter-active,
.btn-fade-leave-active {
  transition: opacity 1.5s ease, transform 1.5s ease;
}

.btn-fade-enter-from,
.btn-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.btn-fade-enter-to,
.btn-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
