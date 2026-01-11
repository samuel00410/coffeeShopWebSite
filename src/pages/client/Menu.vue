<template>
  <ClientLoading :show="loading" />
  <div class="min-h-screen container py-12 mx-auto flex flex-col">
    <div class="mb-10 text-center">
      <div
        class="inline-flex items-center px-5 py-2 mb-4 border-2 rounded-2xl bg-white shadow-sm border-[#FFE8E8]"
      >
        <span
          class="text-sm font-medium text-[#A68F7C] flex items-center gap-2"
        >
          <font-awesome-icon class="text-[#FFD4B0]" :icon="faMenorah" />
          菜單
        </span>
      </div>
      <h1 class="mb-3 text-[#5C4A3A]">我們的菜單</h1>
      <p className="text-[#8B7E74] text-lg">探索完整菜單</p>
    </div>
    <div
      class="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-4 mb-10 p-4 bg-white rounded-3xl shadow-md border-2 border-[#F7F2EB]"
    >
      <!-- 過濾篩選 -->
      <div class="flex flex-wrap gap-2.5">
        <button
          class="px-[20px] py-[10px] rounded-2xl transition-all font-medium text-sm"
          :class="[
            cat.value === selectedCategory
              ? 'bg-linear-to-r from-[#D4B5A0] to-[#E8D5C4] text-[#5C4A3A] shadow-md'
              : 'bg-[#FAF6F1] text-[#8B7E74] hover:bg-[#F7F2EB] border-2 border-transparent hover:border-[#FFE8E8]',
          ]"
          v-for="cat in categories"
          :key="cat.value"
          @click="categorySelect(cat.value)"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>

    <!-- menu展示 -->
    <Transition name="list-out-in" mode="out-in" appear>
      <TransitionGroup
        name="card-fade"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center sm:justify-items-start"
        appear
      >
        <FeaturedCard
          v-for="item in filteredMenu"
          :key="item.id"
          :card="item"
          :width="350"
          @view-detail="goProductPage"
          @add-to-cart="addToCart"
          :disabled="status.loadingItem === item.id"
        />
      </TransitionGroup>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { ToastType } from "../../types/clientToast";
import { ref, computed, onMounted, inject } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faMenorah,
  faTableCells,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import FeaturedCard from "../../components/client/FeaturedCard.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useCartStore } from "../../stores/cart";

const cartStore = useCartStore();

const categories = [
  { name: "全部", value: "全部" },
  { name: "咖啡 ☕️", value: "咖啡" },
  { name: "茶飲 🍵", value: "茶飲" },
  { name: "甜點 🍰", value: "甜點" },
];

const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

onMounted(() => {
  getMenuData();
});

const toast = inject<{
  showCartMsg(msg: string, type: ToastType): void;
}>("toast");

const router = useRouter();

const loading = ref(false);
const menuData = ref([]);
const selectedCategory = ref("全部");
const viewMode = ref("grid");
const status = ref({
  loadingItem: "",
});

const filteredMenu = computed(() => {
  if (selectedCategory.value === "全部") {
    return menuData.value;
  } else {
    return menuData.value.filter(
      (item) => item.category === selectedCategory.value
    );
  }
});

const categorySelect = (category: string) => {
  selectedCategory.value = category;
};

const modeSelect = (mode: string) => {
  viewMode.value = mode;
};

const getMenuData = async () => {
  try {
    loading.value = true;
    const res = await axios.get(`${apiUrl}/api/${apiPath}/products/all`);

    if (res.data.success) {
      menuData.value = res.data.products;
    }
  } catch (err) {
    console.error("Error fetching menu data:", err);
  } finally {
    loading.value = false;
  }
};

const goProductPage = (productId: string) => {
  router.push({ name: "ProductDetail", params: { productId } });
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
</script>

<style scoped>
/* 外層整組列表切換 */
.list-out-in-enter-active,
.list-out-in-leave-active {
  transition: opacity 0.01s;
}
.list-out-in-enter-from,
.list-out-in-leave-to {
  opacity: 1;
}

/* 每張卡片的進出場 */
.card-fade-move {
  transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
}

/* 進場 */
.card-fade-enter-active {
  transition: opacity 1s ease, transform 1s ease;
}

/* 離場 */
.card-fade-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

/* 進場起點/終點 */
.card-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.card-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}

/* 離場起點/終點 */
.card-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.card-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
