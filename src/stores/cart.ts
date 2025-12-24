import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import api from "../utils/api";

const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

export const useCartStore = defineStore("cart", () => {
  // State
  const status = ref({
    loadingItem: "",
  });
  const isCartOpen = ref(false);
  const cartData = ref([]);
  const finalTotal = ref(0);
  const total = ref(0);
  const appliedCoupon = ref(null); // 儲存已套用的優惠券

  // Getters
  const cartCount = computed(() => {
    return cartData.value.length;
  });

  const isEmpty = computed(() => {
    return cartData.value.length === 0;
  });

  const hasCoupon = computed(() => {
    return appliedCoupon.value !== null;
  });

  // 原價 - 最終價格(折後價格) = 折扣金額
  const discount = computed(() => {
    return total.value - finalTotal.value;
  });

  //   Actions
  const openCart = () => {
    isCartOpen.value = true;
  };

  const closeCart = () => {
    isCartOpen.value = false;
  };

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
    if (isCartOpen.value) {
      getCart();
    }
  };

  //   取得購物車資料
  const getCart = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/${apiPath}/cart`);
      if (res.data.success) {
        console.log("getCart:", res.data);
        cartData.value = res.data.data.carts;
        finalTotal.value = res.data.data.final_total;
        total.value = res.data.data.total;

        if (res.data.data.carts[0].coupon) {
          appliedCoupon.value = res.data.data.carts[0].coupon.code;
        } else {
          appliedCoupon.value = null;
        }
      }
    } catch (err) {
      console.error("取得購物車資料失敗:", err);
    }
  };

  // 更新購物車
  const updateCart = async (payload: { productId: string; qty: number }) => {
    status.value.loadingItem = payload.productId;
    try {
      const cart = {
        product_id: payload.productId,
        qty: payload.qty,
      };

      const res = await api.put(`/api/${apiPath}/cart/${payload.productId}`, {
        data: cart,
      });

      if (res.data.success) {
        await getCart();
        status.value.loadingItem = "";
      }
    } catch (err) {
      console.error("更新購物車資料失敗:", err);
    }
  };

  // 刪除某一筆購物車資料
  const removeCartItem = async (cartItemId: string) => {
    status.value.loadingItem = cartItemId;

    try {
      const res = await axios.delete(
        `${apiUrl}/api/${apiPath}/cart/${cartItemId}`
      );

      if (res.data.success) {
        await getCart();
        status.value.loadingItem = "";
      }
    } catch (err) {
      console.error("刪除購物車項目失敗:", err);
    }
  };

  // 清空購物車
  const clearCart = async () => {
    try {
      const res = await axios.delete(`${apiUrl}/api/${apiPath}/carts`);

      if (res.data.success) {
        await getCart();

        appliedCoupon.value = null;
      }
    } catch (err) {
      console.error("清空購物車失敗:", err);
    }
  };

  return {
    // State
    status,
    isCartOpen,
    cartData,
    finalTotal,
    total,
    appliedCoupon,
    // Getters
    cartCount,
    isEmpty,
    hasCoupon,
    discount,
    // Actions
    openCart,
    closeCart,
    toggleCart,
    getCart,
    updateCart,
    removeCartItem,
    clearCart,
  };
});
