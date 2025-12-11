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
      <!-- 排列顯示 -->
      <div
        class="p-1.5 flex items-center gap-2 border-2 border-[#F7F2EB] rounded-2xl bg-[#FAF6F1]"
      >
        <button
          class="p-2 rounded-xl transition-all duration-300"
          :class="[
            viewMode === 'grid'
              ? 'bg-linear-to-r from-[#D4B5A0] to-[#E8D5C4] text-white shadow-sm'
              : 'text-[#8B7E74] hover:bg-white',
          ]"
          @click="modeSelect('grid')"
        >
          <font-awesome-icon :icon="faTableCells" />
        </button>
        <button
          class="p-2 rounded-xl text-[#8B7E74] hover:bg-white transition-all duration-300"
          @click="modeSelect('list')"
          :class="[
            viewMode === 'list'
              ? 'bg-linear-to-r from-[#D4B5A0] to-[#E8D5C4] text-white shadow-sm'
              : 'text-[#8B7E74] hover:bg-white',
          ]"
        >
          <font-awesome-icon :icon="faList" />
        </button>
      </div>
    </div>

    <!-- menu展示 -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <FeaturedCard
        v-for="item in filteredMenu"
        :key="item.id"
        :card="item"
        :width="350"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faMenorah,
  faTableCells,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import FeaturedCard from "../../components/client/FeaturedCard.vue";
import axios from "axios";

const categories = [
  { name: "全部", value: "全部" },
  { name: "咖啡 ☕️", value: "咖啡" },
  { name: "飲品 🍵", value: "飲品" },
  { name: "甜點 🍰", value: "甜點" },
];

onMounted(() => {
  getMenuData();
});

const loading = ref(false);
const menuData = ref([]);
const selectedCategory = ref("全部");
const viewMode = ref("grid");

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
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiPath = import.meta.env.VITE_API_PATH;
  try {
    loading.value = true;
    let res = await axios.get(`${apiUrl}/api/${apiPath}/products/all`);

    if (res.data.success) {
      menuData.value = res.data.products;
    }
  } catch (err) {
    console.error("Error fetching menu data:", err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
