<template>
  <!-- 卡片布局 -->
  <div
    v-if="variant === 'grid'"
    class="card group relative bg-white overflow-hidden shadow-[0_6px_0_0_#E8DBC8] transition-all duration-300 hover:shadow-[0_10px_0_0_#E8DBC8] rounded-[2rem] border-4 border-[#4A3D2F] hover:-translate-y-1 cursor-pointer flex flex-col"
    :style="{ maxWidth: `${cardWidth}px` }"
    @click="viewDetail"
  >
    <!-- 熱門標籤 -->
    <div
      class="absolute top-4 right-4 z-10 px-4 py-1 bg-[#FFE0E0] text-[#4A3D2F] shadow-[0_4px_0_0_#C4A68A] border-3 border-[#4A3D2F] rounded-full rotate-6 group-hover:rotate-12 transition-transform"
    >
      <div class="flex items-center gap-1">
        <StarIcon class="w-4 h-4 text-[#FFD700]" />
        <span class="text-[#4A3D2F] text-xs font-black"> 熱門 </span>
      </div>
    </div>

    <!-- 圖片 -->
    <figure class="overflow-hidden aspect-square">
      <img
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        :src="card.imageUrl"
        alt="特選產品"
      />
    </figure>
    <div class="card-body flex-1 flex flex-col">
      <div class="flex-1 mb-2">
        <h2 class="mb-1.5 card-title text-card-title">{{ card.title }}</h2>
        <p
          class="text-left text-card-description line-clamp-2 leading-relaxed font-medium"
        >
          {{ card.description }}
        </p>
      </div>
      <div
        class="pt-6 flex-1 card-actions items-center justify-between border-t-3 border-[#FFF5E8] border-dashed mt-auto"
      >
        <div class="flex flex-col">
          <span
            class="text-xs text-[#8B7A68] font-black mb-1 flex items-center gap-1"
          >
            💰 價格
          </span>
          <span class="text-xl font-black text-[#6B5444]"
            >$NT {{ card.origin_price }} / {{ card.unit }}</span
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

  <!-- 列表布局 (購物車專用) -->
  <div
    v-else
    class="relative flex flex-wrap gap-6 p-4 bg-white rounded-2xl shadow-md border-2 border-[#F7F2EB]"
    :class="{ 'opacity-60': disabled }"
  >
    <div
      class="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-[#F7F2EB]"
    >
      <img
        :src="card.product.imageUrl"
        alt="Product Image"
        class="w-full h-full object-cover rounded-2xl"
      />
    </div>
    <div class="flex-1 flex items-end justify-between">
      <div class="space-y-2">
        <h2 class="text-xl font-black text-[#4A3D2F] mb-1 truncate">
          {{ card.product.title }}
        </h2>

        <div class="text-[#4A3D2F]">
          NT ${{ card.product.price }} / {{ card.product.unit }}
        </div>

        <div
          class="inline-flex items-center gap-2 bg-[#FFF5E8] rounded-full p-1 border-2 border-[#4A3D2F]"
        >
          <button
            class="w-7 h-7 rounded-full bg-white text-[#4A3D2F] hover:bg-[#FFE5D1] flex items-center justify-center transition-all hover:scale-110 active:scale-95 border-2 border-[#4A3D2F] cursor-pointer"
            @click="decreaseQty"
          >
            -
          </button>
          <span
            class="text-sm font-black text-[#4A3D2F] min-w-[24px] text-center"
            >{{ card.qty }}</span
          >
          <button
            class="w-7 h-7 rounded-full bg-white text-[#4A3D2F] hover:bg-[#FFE5D1] flex items-center justify-center transition-all hover:scale-110 active:scale-95 border-2 border-[#4A3D2F] cursor-pointer"
            @click="increaseQty"
          >
            +
          </button>
        </div>
      </div>

      <div class="flex gap-2 items-center">
        <span
          v-if="disabled"
          class="loading loading-spinner text-[#4A3D2F]"
        ></span>
        <p class="text-lg font-black text-[#4A3D2F]">
          小計 : $NT {{ card.total }}
        </p>
      </div>
    </div>

    <button
      class="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FFE0E0] hover:bg-[#FFC8C8] flex items-center justify-center transition-all hover:scale-110 active:scale-95 border-2 border-[#4A3D2F] cursor-pointer"
      @click="$emit('remove-cartItem', card.id)"
    >
      <TrashIcon class="w-4 h-4 text-[#4A3D2F]" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { StarIcon, TrashIcon } from "@heroicons/vue/24/solid";

type Variant = "grid" | "list";

const props = withDefaults(
  defineProps<{
    card: any;
    width?: number;
    disabled?: boolean;
    variant?: Variant;
  }>(),
  {
    variant: "grid",
    width: 420,
    disabled: false,
  }
);

const emit = defineEmits<{
  (e: "add-to-cart", id: string): void;
  (e: "view-detail", id: string): void;
  (e: "remove-cartItem", id: string): void;
  (e: "update-quantity", payload: { productId: string; qty: number }): void;
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

const increaseQty = () => {
  const newQty = props.card.qty + 1;
  emit("update-quantity", { productId: props.card.id, qty: newQty });
};

const decreaseQty = () => {
  if (props.card.qty <= 1) return;
  const newQty = props.card.qty - 1;
  emit("update-quantity", { productId: props.card.id, qty: newQty });
};
</script>

<style scoped></style>
