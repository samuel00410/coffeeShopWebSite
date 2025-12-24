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
          @click="cartStore.toggleCart"
        >
          <XMarkIcon class="w-4 h-4 text-[#4A3D2F]" />
        </button>
      </div>
    </div>

    <!-- 購物車內容 -->
    <div class="p-6 h-[calc(100vh-360px)] overflow-y-auto">
      <!-- 移除優惠券 Loading 狀態 -->
      <div
        v-if="loadingRemoveCoupon"
        class="flex flex-col h-full items-center justify-center text-center"
      >
        <span
          class="loading loading-spinner loading-lg text-[#FFD4B0] mb-4"
        ></span>
        <p class="text-lg text-[#4A3D2F] font-bold">正在移除優惠券...</p>
        <p class="text-sm text-[#8B7A68] mt-2">請稍候，正在重新整理購物車</p>
      </div>

      <!-- 購物車為空時顯示 -->
      <div
        v-else-if="cartStore.isEmpty"
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

      <div v-else class="flex flex-col gap-3">
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
      v-if="!cartStore.isEmpty || loadingRemoveCoupon"
      class="sticky bottom-0 bg-linear-to-t from-[#FFF9F0] to-[#FFF9F0]/95 backdrop-blur-sm border-t-3 border-[#4A3D2F] px-6 py-5 space-y-4"
    >
      <!-- 優惠券輸入區 -->
      <div v-if="!cartStore.hasCoupon">
        <div class="space-y-2">
          <label class="text-[#8B7A68] font-bold block">優惠券代碼</label>
          <div class="flex gap-2">
            <input
              class="flex-1 px-4 py-2.5 bg-white rounded-xl border-2 border-[#4A3D2F] focus:border-[#FFD4B0] focus:outline-none text-sm text-[#4A3D2F] font-bold placeholder:text-[#D4C4A8] placeholder:font-normal transition-colors disabled:opacity-50"
              type="text"
              v-model.trim="couponCode"
              placeholder="輸入優惠券"
              @input="couponErrMsg = ''"
            />
            <button
              class="px-5 py-2.5 bg-[#FFF5E8] text-[#4A3D2F] rounded-2xl font-bold text-sm border-2 border-[#4A3D2F] transition-all flex items-center gap-2"
              :class="[
                isApplyDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer hover:scale-105 active:scale-95 hover:bg-[#FFE5D1]',
              ]"
              @click="applyCoupon"
            >
              <span
                v-if="loadingCoupon"
                class="loading loading-spinner text-[#FFD4B0]"
              ></span>
              {{ loadingCoupon ? "驗證中" : "套用" }}
            </button>
          </div>
        </div>
        <!-- 優惠券輸入無效提示文字 -->
        <p
          v-if="couponErrMsg"
          class="text-[#FF6B6B] font-bold animate-text-fade-in"
        >
          {{ couponErrMsg }}
        </p>
      </div>

      <!-- 優惠券成功時顯示 -->
      <div
        v-if="cartStore.hasCoupon"
        class="bg-linear-to-r from-[#E8F5E8] to-[#F0FAF0] rounded-xl p-3 border-2 border-[#A8D4A8] animate-text-fade-in"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-[#6B9B6B] font-bold mb-1">已套用優惠券</p>
            <p class="text-sm text-[#4A8A4A] font-black">
              {{ cartStore.appliedCoupon }}
            </p>
          </div>
          <button
            @click="handleRemoveCoupon"
            class="w-7 h-7 rounded-full bg-white hover:bg-[#FFE0E0] flex items-center justify-center transition-all hover:scale-110 active:scale-95 border-2 border-[#4A3D2F]"
            title="移除優惠券"
          >
            <XMarkIcon class="w-4 h-4 text-[#4A3D2F]" />
          </button>
        </div>
      </div>

      <!-- 折扣顯示 -->
      <div
        v-if="cartStore.hasCoupon"
        className="flex items-center justify-between animate-text-fade-in"
      >
        <span className="text-[#6B9B6B] font-bold">折扣</span>
        <span className="text-[#4A8A4A] font-black"
          >-NT${{ cartStore.discount }}</span
        >
      </div>

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
import { ref, computed } from "vue";
import api from "../../utils/api";

const rounter = useRouter();
const cartStore = useCartStore();

// ---優惠券相關---
const couponCode = ref("");
const couponErrMsg = ref("");
const loadingCoupon = ref(false);
const loadingRemoveCoupon = ref(false);

// 套用優惠券按鈕沒有輸入優惠券代碼時，按鈕會被禁用
const isApplyDisabled = computed(() => {
  return couponCode.value.trim() === "";
});

// 添加優惠券
const applyCoupon = async () => {
  couponErrMsg.value = "";
  loadingCoupon.value = true;
  const payload = {
    data: {
      code: couponCode.value,
    },
  };

  try {
    const res = await api.post(
      `/api/${import.meta.env.VITE_API_PATH}/coupon`,
      payload
    );

    if (res.data.success) {
      await cartStore.getCart();
    }
  } catch (err: any) {
    console.error("添加優惠券失敗:", err);
    if (err.response) {
      console.log(err.response.data.message);
      couponErrMsg.value = err.response.data.message;
    }
  } finally {
    loadingCoupon.value = false;
  }
};

// 移除優惠券 (因為沒有刪除優惠券的 API，所以透過重新加入購物車的方式達成)
const handleRemoveCoupon = async () => {
  if (cartStore.cartData.length === 0) return;

  loadingRemoveCoupon.value = true;
  try {
    //  備份購物車資料
    const backupCart = cartStore.cartData.map((item: any) => ({
      id: item.product.id,
      qty: item.qty,
    }));

    // 清空購物車
    await cartStore.clearCart();

    // 重新加入(所有商品)購物車
    for (const item of backupCart) {
      await api.post(`/api/${import.meta.env.VITE_API_PATH}/cart`, {
        data: {
          product_id: item.id,
          qty: item.qty,
        },
      });
    }

    await cartStore.getCart();
    couponCode.value = "";
  } catch (err) {
    console.error("移除優惠券失敗:", err);
  } finally {
    loadingRemoveCoupon.value = false;
  }
};

const goToMenu = () => {
  cartStore.toggleCart();
  rounter.push({ name: "Menu" });
};
</script>
