<template>
  <!-- 遮罩 -->
  <div
    v-if="cartStore.isCartOpen"
    @click="cartStore.toggleCart"
    class="fixed inset-0 bg-black/50 z-60"
  />

  <!-- 購物車面板 -->
  <div
    class="fixed right-0 top-0 w-full h-full sm:w-[480px] bg-linear-to-b from-[#FFFBF5] shadow-2xl to-[#FFF9F0] z-70 transform transition-transform duration-300 ease-out"
    :class="cartStore.isCartOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <!-- 標題 -->
    <div class="px-6 py-5 border-b-3 border-[#4A3D2F]">
      <div class="flex items-center justify-between gap-3">
        <div
          class="w-12 h-12 bg-[#FFE0E0] rounded-full flex items-center justify-center shadow-[0_3px_0_0_#FFB0B0] border-3 border-[#4A3D2F]"
        >
          <ShoppingCartIcon class="w-6 h-6 text-[#4A3D2F]" />
        </div>
        <div>
          <h2 class="text-2xl font-black text-[#4A3D2F]">購物車</h2>
          <p v-if="cartStore.isEmpty" class="text-sm text-[#8B7A68] font-bold">
            目前沒有商品
          </p>
          <p v-if="!cartStore.isEmpty" class="text-sm text-[#8B7A68] font-bold">
            {{ cartStore.cartCount }} 件商品
          </p>
        </div>

        <button
          class="ml-auto p-3 bg-[#FFF5E8] rounded-full hover:bg-[#FFE5D1] transition-all hover:scale-110 active:scale-95 border-2 border-[#4A3D2F] cursor-pointer"
        >
          <XMarkIcon
            @click="cartStore.toggleCart"
            class="w-4 h-4 text-[#4A3D2F]"
          />
        </button>
      </div>
    </div>

    <!-- 購物車內容 -->
    <div class="p-6 h-[calc(100vh-260px)] overflow-y-auto">
      <div
        v-if="cartStore.isEmpty"
        class="flex flex-col h-full items-center justify-center text-center"
      >
        <div class="w-[250px] mb-6 ml-12">
          <img :src="noCartImg" alt="Empty Cart" class="w-full" />
        </div>
        <h4 class="text-[#4A3D2F] mb-2">購物車是空的唷!</h4>
        <p class="text-md text-[#8B7A68] mb-6">添加一些美味的餐點吧！</p>
        <button class="btn-primary px-6 py-3 text-base" @click="goToMenu">
          瀏覽菜單
        </button>
      </div>

      <div class="flex flex-col gap-3" v-if="!cartStore.isEmpty">
        <FeaturedCard
          v-for="(item, index) in cartStore.cartData"
          :key="item.id"
          :card="item"
          :disabled="cartStore.status.loadingItem === item.id"
          variant="list"
          @remove-cartItem="cartStore.removeCartItem"
          @update-quantity="cartStore.updateCart"
        />
      </div>
    </div>

    <!-- 結帳區 -->
    <div
      v-if="!cartStore.isEmpty"
      class="sticky bottom-0 bg-linear-to-t from-[#FFF9F0] to-[#FFF9F0]/95 backdrop-blur-sm border-t-3 border-[#4A3D2F] px-6 py-5 space-y-4"
    >
      <div class="flex items-center justify-between">
        <button
          class="px-6 py-2 bg-[#E8D5C4] text-[#6B5444] rounded-lg font-black text-base shadow-[0_4px_0_0_#C4A68A] hover:shadow-[0_6px_0_0_#C4A68A] transition-all hover:scale-105 active:scale-95 border-3 border-[#4A3D2F] flex items-center justify-center gap-2 cursor-pointer"
          @click="cartStore.clearCart"
        >
          清空購物清單
        </button>
        <span class="text-2xl font-black text-[#4A3D2F]"
          >總計 : NT${{ cartStore.finalTotal }}</span
        >
      </div>

      <button
        class="w-full px-8 py-4 bg-[#FFD4B0] text-[#4A3D2F] rounded-full font-black text-base shadow-[0_4px_0_0_#C4A68A] hover:shadow-[0_6px_0_0_#C4A68A] transition-all hover:scale-105 active:scale-95 border-3 border-[#4A3D2F] flex items-center justify-center gap-2 cursor-pointer"
      >
        前往結帳
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import noCartImg from "../../assets/images/cart/s0102_13_2.png";
import FeaturedCard from "../../components/client/FeaturedCard.vue";
import { useCartStore } from "../../stores/cart";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const rounter = useRouter();
const cartStore = useCartStore();

const goToMenu = () => {
  cartStore.toggleCart();
  rounter.push({ name: "Menu" });
};
</script>
