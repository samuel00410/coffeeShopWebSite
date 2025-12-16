<template>
  <div
    class="card group relative h-[600px] bg-white overflow-hidden shadow-[0_6px_0_0_#E8DBC8] transition-all duration-300 hover:shadow-[0_10px_0_0_#E8DBC8] rounded-[2rem] border-4 border-[#4A3D2F] hover:-translate-y-1 cursor-pointer"
    :style="{ maxWidth: `${cardWidth}px` }"
    @click="viewDetail"
  >
    <!-- 熱門標籤 -->
    <div
      class="absolute top-4 right-4 z-10 px-4 py-1 bg-[#FFE0E0] text-[#4A3D2F] shadow-[0_4px_0_0_#C4A68A] border-3 border-[#4A3D2F] rounded-full rotate-6 group-hover:rotate-12 transition-transform"
    >
      <div class="flex items-center gap-1">
        <StarIcon class="w-4 h-4 text-[#FFD700]" />
        <span class="text-#4A3D2F text-xs font-black"> 熱門 </span>
      </div>
    </div>

    <!-- 圖片 -->
    <figure class="overflow-hidden">
      <img
        class="w-[380px] h-[400px] object-cover group-hover:scale-110 transition-transform duration-500"
        :src="card.imageUrl"
        alt="特選產品"
      />
    </figure>
    <div class="card-body">
      <div>
        <h2 class="card-title text-card-title">{{ card.title }}</h2>
        <p
          class="mb-5 text-left text-card-description line-clamp-2 leading-relaxed font-medium"
        >
          {{ card.description }}
        </p>
      </div>
      <div
        class="card-actions items-center justify-between pt-4 border-t-3 border-[#FFF5E8] border-dashed"
      >
        <div className="flex flex-col">
          <span
            className="text-xs text-[#8B7A68] font-black mb-1 flex items-center gap-1"
          >
            💰 價格
          </span>
          <span className="text-xl font-black text-[#6B5444]"
            >$NT {{ card.origin_price }} / 杯</span
          >
        </div>
        <div :class="{ 'cursor-not-allowed': disabled }">
          <button
            @click.stop="addToCart"
            :class="buttonClass"
            :disabled="disabled"
          >
            <span v-if="disabled" class="loading loading-spinner"></span>
            + 加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { StarIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{
  card: any;
  width?: number;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "add-to-cart", id: string): void;
  (e: "view-detail", id: string): void;
}>();

const cardWidth = computed(() => props.width || 420);

const buttonClass = computed(() =>
  props.disabled
    ? "btn-disabled px-4 py-2 text-sm"
    : "btn-primary px-4 py-2 text-sm"
);

const viewDetail = () => {
  emit("view-detail", props.card.id);
};

const addToCart = () => {
  if (props.disabled) return;
  emit("add-to-cart", props.card.id);
};
</script>

<style scoped></style>
