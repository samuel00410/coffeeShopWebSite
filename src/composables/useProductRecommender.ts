import type { Product } from "../types/product";
import type { Answers } from "./useChat";
import { ref } from "vue";
import api from "../utils/api";

// 關鍵字對照表
const flavorKeywords: Record<string, string[]> = {
  濃郁: ["濃郁", "香醇", "厚實", "濃厚"],
  清爽: ["清爽", "冰", "輕盈", "氣泡"],
  巧克力: ["巧克力", "可可"],
  清淡: ["奶油", "原味", "清淡"],
  鬆軟: ["鬆軟", "濕潤", "軟"],
  紮實: ["紮實", "濕潤", "厚"],
};

export function useProductRecommender() {
  const apiPath = import.meta.env.VITE_API_PATH;

  const products = ref<Product[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  async function recommend(answers: Answers) {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await api.get(`/api/${apiPath}/products/all`);
      if (res && res.data) {
        const categoryFiltered = res.data.products.filter(
          (product: Product) => product.category === answers.category,
        );

        const keywords = flavorKeywords[answers.flavor ?? ""] ?? [];

        const flavorFiltered = categoryFiltered.filter((product: Product) => {
          const text = product.content + product.description;
          return keywords.some((keyword) => text.includes(keyword));
        });

        // 如果口味過濾後的結果太少，就退回到只根據類別過濾的結果中隨機選擇
        const pool =
          flavorFiltered.length >= 2 ? flavorFiltered : categoryFiltered;
        // 隨機打亂陣列並取前 2 或 3 件商品
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        products.value = shuffled.slice(0, Math.floor(Math.random() * 2) + 2); // 2 或 3 件
      }
    } catch (err) {
      console.error("取得商品失敗", err);
      error.value = "取得商品失敗";
    } finally {
      isLoading.value = false;
    }
  }

  return {
    products,
    isLoading,
    error,
    recommend,
  };
}
