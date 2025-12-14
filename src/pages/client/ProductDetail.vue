<template>
  <ClientLoading :show="loading" />
  <div class="min-h-screen max-w-7xl py-12 px-4 mx-auto">
    <button
      class="px-5 py-3 flex items-center gap-2 bg-white text-[#8B7E74] hover:text-[#D4B5A0] mb-10 shadow-sm hover:shadow-md border-2 border-[#F7F2EB] rounded-2xl font-medium"
      @click="goBack"
    >
      <ArrowLeftIcon class="w-6 h-6" />
      返回菜單
    </button>

    <div class="mb-16 flex flex-col lg:flex-row gap-12">
      <div
        class="product_img w-full lg:flex-6 aspect-square lg:max-w-[600px] overflow-hidden rounded-[2.5rem] bg-white border-4 border-white"
      >
        <img
          class="w-full h-full object-cover"
          :src="product.imageUrl"
          alt="產品圖片"
        />
      </div>

      <div
        class="product_content flex flex-col items-center lg:items-start w-full lg:flex-4"
      >
        <div
          class="inline-flex border-2 mb-5 border-white bg-linear-to-r from-[#E8F5E8] to-[#FFE8E8] rounded-full shadow-sm px-5 py-2"
        >
          <p class="text-sm text-[#5C4A3A] capitalize font-medium">
            {{ product.category }}
          </p>
        </div>
        <h1 class="mb-5 text-[#5C4A3A]">
          {{ product.title }}
        </h1>
        <p class="text-[#8B7E74] mb-8 text-lg leading-relaxed">
          {{ product.content }}
        </p>
        <div
          class="w-[280px] mb-8 bg-linear-to-r from-[#FAF6F1] to-[#F7F2EB] px-6 py-4 flex items-center justify-between border-2 border-[#FFE8E8] rounded-2xl"
        >
          <span class="text-xl font-bold text-[#A68F7C]">
            原價: ${{ product.origin_price }}
          </span>
          <span class="text-xl font-bold text-[#e43526]">
            優惠: ${{ product.price }}
          </span>
        </div>

        <div class="mb-16">
          <p class="block mb-4 text-[#5C4A3A] font-semibold">數量</p>
          <div
            class="w-[240px] flex items-center justify-around gap-4 bg-white border-2 border-[#F7F2EB] rounded-2xl p-4 shadow-sm"
          >
            <button
              class="w-12 h-12 text-2xl rounded-xl bg-[#FAF6F1] hover:bg-[#F7F2EB] hover:text-white text-[#8B7E74] transition-all"
              @click="decrease"
            >
              -
            </button>
            <span
              class="min-w-[60px] text-center text-lg font-medium text-[#5C4A3A]"
              >{{ quantity }}</span
            >
            <button
              class="w-12 h-12 text-2xl rounded-xl bg-[#FAF6F1] hover:bg-[#F7F2EB] hover:text-white text-[#8B7E74] transition-all"
              @click="increase"
            >
              +
            </button>
          </div>
        </div>

        <button
          class="min-w-[300px] w-[50%] px-10 py-5 text-lg bg-[#FFD4B0] text-[#4A3D2F] hover:bg-[#FFC098] shadow-[0_4px_0_0_#C4A68A] hover:shadow-[0_6px_0_0_#C4A68A] border-3 border-[#4A3D2F] rounded-2xl cursor-pointer"
        >
          加入購物車 - ${{ totalPrice }}
        </button>
      </div>
    </div>

    <!-- 相似商品 -->
    <div>
      <div class="text-center mb-10">
        <div
          class="inline-block bg-white rounded-full px-5 py-2 mb-4 shadow-sm border-2 border-[#FFE8E8]"
        >
          <span class="text-sm font-medium text-[#A68F7C]">💫 推薦商品</span>
        </div>
        <h2 class="text-[#5C4A3A]">相似商品</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeaturedCard
            v-for="item in similarProducts"
            :key="item.id"
            :card="item"
            :width="350"
            @click="goProductPage(item.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ClientLoading from "../../components/client/ClientLoading.vue";
import FeaturedCard from "../../components/client/FeaturedCard.vue";
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Product } from "../../types/product";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

onMounted(() => {
  getProduct();
});

const loading = ref(false);
const product = ref<Product>({} as Product);
const quantity = ref(1);
const similarProducts = ref<any>([]); // 相似商品列表

const totalPrice = computed(() => product.value.price * quantity.value);

const getProduct = async () => {
  const productId = route.params.productId;

  try {
    loading.value = true;

    let res = await axios.get(`${apiUrl}/api/${apiPath}/product/${productId}`);
    if (!res.data.success) {
      throw new Error("取得單一商品失敗");
    }

    console.log("單一商品資料:", res.data.product);
    product.value = res.data.product;

    getSimilarProducts();
  } catch (err) {
    console.error("取得單一商品失敗:", err);
  } finally {
    loading.value = false;
  }
};

//  洗牌函數
function shuffle(array) {
  const shuffled = [...array]; // 複製避免修改原陣列
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const getSimilarProducts = async () => {
  const res = await axios.get(`${apiUrl}/api/${apiPath}/products/all`);

  const filtered = res.data.products.filter((item) => {
    return (
      item.category === product.value.category && item.id !== product.value.id
    );
  });

  similarProducts.value = shuffle(filtered).slice(0, 3);
};

const increase = () => {
  quantity.value += 1;
};

const decrease = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
  }
};

const goProductPage = (productId: string) => {
  router.push({ name: "ProductDetail", params: { productId } });
};

const goBack = () => {
  router.push({ name: "Menu" });
};

watch(
  () => route.params.productId,
  (newId) => {
    if (newId) {
      getProduct();
    }
  }
);
</script>

<style scoped></style>
