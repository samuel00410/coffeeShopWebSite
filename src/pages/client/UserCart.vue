<template>
  <div class="container mx-auto py-12 px-4">
    <button
      class="px-5 py-3 flex items-center gap-2 bg-white text-[#8B7E74] hover:text-[#D4B5A0] mb-10 shadow-sm hover:shadow-md border-2 border-[#F7F2EB] rounded-2xl font-medium"
      @click="goBack"
    >
      <ArrowLeftIcon class="w-6 h-6" />
      返回菜單
    </button>

    <div v-if="CartData.length > 0" class="cart_content"></div>
    <div v-else class="flex flex-col items-center">
      <div class="w-[250px] mb-6 ml-15">
        <img :src="noCartImg" alt="Empty Cart" class="w-full" />
      </div>
      <h2 class="text-[#5C4A3A] mb-6">購物車目前是空的唷!</h2>
      <p className="text-[#8B7E74] mb-10 text-lg">添加一些美味的商品開始吧！</p>
      <button class="btn-primary px-8 py-4 text-base">瀏覽菜單</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import noCartImg from "../../assets/images/cart/s0102_13_2.png";
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

const router = useRouter();

const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

onMounted(() => {
  // getCart();
});

const CartData = ref([]);
const finalTotal = ref(0);
const total = ref(0);

const getCart = async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/${apiPath}/cart`);
    if (res.data.success) {
      console.log(res.data);
      CartData.value = res.data.data.carts;
      finalTotal.value = res.data.data.final_total;
      total.value = res.data.data.total;
    }
  } catch (err) {
    console.error("取得購物車資料失敗:", err);
  }
};

const goBack = () => {
  router.push({ name: "Menu" });
};
</script>

<style scoped></style>
