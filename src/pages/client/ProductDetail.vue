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

    <div class="mb-16 border-[#F7F2EB] flex flex-col lg:flex-row gap-12">
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
          <span
            class="text-xl font-bold text-[#A68F7C]"
            :class="{
              'line-through':
                product.price && product.origin_price > product.price,
            }"
          >
            原價: ${{ product.origin_price }}
          </span>
          <span v-if="product.price" class="text-xl font-bold text-[#e43526]">
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

        <button :class="btnClass" @click="addItemToCart(product.id)">
          <span
            v-if="status.loadingItem"
            class="loading loading-spinner"
          ></span>
          加入購物車 - ${{ totalPrice }}
        </button>
      </div>
    </div>

    <!-- 常見問答 -->
    <div class="border-t-2 border-dashed border-[#E8DBC8] py-16">
      <h2 class="text-[#5C4A3A] mb-8">常見問答</h2>

      <div
        class="bg-linear-to-br from-[#FAF6F1] to-[#F7F2EB] rounded-2xl p-8 border-2 border-[#FFE8E8] shadow-sm max-w-4xl space-y-4"
      >
        <!-- Q1 -->
        <div>
          <h4
            class="text-lg font-bold text-[#5C4A3A] mb-2 flex items-center gap-2"
          >
            <span class="text-[#D4A574]">Q.</span>
            <span>商品什麼時候可以取餐或出貨？</span>
          </h4>
          <div class="space-y-3 pl-6 text-[#6B5D53]">
            <p class="leading-relaxed">
              <span class="font-semibold text-[#8B7355]">咖啡與飲品：</span>
              下單並完成付款後，約
              <span class="font-semibold">15–20 分鐘</span>
              內即可製作完成，適合現場取餐或外送。
            </p>
            <p class="leading-relaxed">
              <span class="font-semibold text-[#8B7355]">甜點類商品：</span>
              若為當日現貨甜點，將於當日製作完成後出餐；若為手工製作甜點，可能需
              <span class="font-semibold">1–3 個工作天</span
              >，實際時間依商品頁說明為主。
            </p>
          </div>
        </div>

        <!-- Q2 -->
        <div>
          <h4
            class="text-lg font-bold text-[#5C4A3A] mb-2 flex items-center gap-2"
          >
            <span class="text-[#D4A574]">Q.</span>
            <span>咖啡與飲品可以調整甜度或冰量嗎？</span>
          </h4>
          <div class="pl-6 text-[#6B5D53]">
            <p class="leading-relaxed">
              大部分飲品皆可調整
              <span class="font-semibold">甜度、冰量</span
              >，請在下單時於「備註欄位」告知我們您的需求。若未特別備註，將依店內建議比例製作。
            </p>
          </div>
        </div>

        <!-- Q3 -->
        <div>
          <h4
            class="text-lg font-bold text-[#5C4A3A] mb-2 flex items-center gap-2"
          >
            <span class="text-[#D4A574]">Q.</span>
            <span>甜點的保存方式與保存期限是多久？</span>
          </h4>
          <div class="space-y-3 pl-6 text-[#6B5D53]">
            <p class="leading-relaxed">
              <span class="font-semibold text-[#8B7355]">咖啡與飲品：</span>
              建議於當日飲用完畢，風味最佳。
            </p>
            <div>
              <p class="font-semibold text-[#8B7355] mb-2">甜點類商品：</p>
              <ul class="ml-4 space-y-2 list-none">
                <li class="flex items-center gap-2">
                  <span class="text-[#D4A574]">•</span>
                  <span
                    ><span class="font-semibold">常溫甜點：</span
                    >請依商品標示保存期限</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-[#D4A574]">•</span>
                  <span
                    ><span class="font-semibold">冷藏甜點：</span
                    >建議冷藏保存並於 2–3 天內食用</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-[#D4A574]">•</span>
                  <span
                    ><span class="font-semibold">冷凍甜點：</span
                    >可冷凍保存，食用前請提前退冰</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Q4 -->
        <div>
          <h4
            class="text-lg font-bold text-[#5C4A3A] mb-2 flex items-center gap-2"
          >
            <span class="text-[#D4A574]">Q.</span>
            <span>可以取消或修改訂單嗎？</span>
          </h4>
          <div class="space-y-2 pl-6 text-[#6B5D53]">
            <p class="leading-relaxed">
              在<span class="font-semibold">尚未開始製作前</span
              >，可協助修改或取消訂單。
            </p>
            <p class="leading-relaxed">
              若商品已進入製作流程，恕無法取消或退款，敬請見諒。
            </p>
          </div>
        </div>

        <!-- Q5 -->
        <div>
          <h4
            class="text-lg font-bold text-[#5C4A3A] mb-2 flex items-center gap-2"
          >
            <span class="text-[#D4A574]">Q.</span>
            <span>如果收到的商品有問題怎麼辦？</span>
          </h4>
          <div class="pl-6 text-[#6B5D53]">
            <p class="leading-relaxed">
              我們非常重視您的體驗<br />
              若收到商品有<span class="font-semibold"
                >品項錯誤、嚴重瑕疵或運送異常</span
              >，請於<span class="font-semibold">當日內</span
              >聯繫我們，並提供相關照片，我們將盡快協助處理。
            </p>
          </div>
        </div>
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
        <h2 class="text-[#5C4A3A] mb-4">相似商品</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeaturedCard
            v-for="item in similarProducts"
            :key="item.id"
            :card="item"
            :width="350"
            @view-detail="goProductPage"
            @add-to-cart="addToCart"
            :disabled="status.loadingItem === item.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ToastType } from "../../types/clientToast";
import type { Product } from "../../types/product";
import ClientLoading from "../../components/client/ClientLoading.vue";
import FeaturedCard from "../../components/client/FeaturedCard.vue";
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";
import { ref, onMounted, computed, watch, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useCartStore } from "../../stores/cart";

const cartStore = useCartStore();

const route = useRoute();
const router = useRouter();

const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

onMounted(() => {
  getProduct();
});

const toast = inject<{
  showCartMsg(msg: string, type: ToastType): void;
}>("toast");

const loading = ref(false);
const product = ref<Product>({} as Product);
const quantity = ref(1);
const similarProducts = ref<any>([]); // 相似商品列表
const status = ref({
  loadingItem: "",
});

const totalPrice = computed(() => product.value.price * quantity.value);

const btnClass = computed(() =>
  status.value.loadingItem
    ? "min-w-[300px] w-[50%] px-10 py-5 text-lg bg-[#E8DBC8] text-[#A89582] shadow-[0_4px_0_0_#D4C4B0] border-3 border-[#C4B5A0] rounded-2xl cursor-not-allowed "
    : "min-w-[300px] w-[50%] px-10 py-5 text-lg bg-[#FFD4B0] text-[#4A3D2F] hover:bg-[#FFC098] shadow-[0_4px_0_0_#C4A68A] hover:shadow-[0_6px_0_0_#C4A68A] border-3 border-[#4A3D2F] rounded-2xl cursor-pointer"
);

const getProduct = async () => {
  const productId = route.params.productId;

  try {
    loading.value = true;

    let res = await axios.get(`${apiUrl}/api/${apiPath}/product/${productId}`);
    if (!res.data.success) {
      throw new Error("取得單一商品失敗");
    }
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

// 相似產品加入購物車
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

// 單一產品加入購物車(可選數量)
const addItemToCart = async (productId: string) => {
  try {
    status.value.loadingItem = productId;
    const res = await axios.post(`${apiUrl}/api/${apiPath}/cart`, {
      data: { product_id: productId, qty: quantity.value },
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
