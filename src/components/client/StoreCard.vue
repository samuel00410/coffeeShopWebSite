<template>
  <button
    class="cursor-pointer rounded-2xl border-4 border-[#4A3D2F] bg-[#FFFDF9] p-5 text-left shadow-[0_6px_0_0_#E8DBC8] transition-all duration-200 hover:scale-105 active:scale-95"
    @click="$emit('select', store)"
  >
    <h3 class="text-lg font-bold text-[#4A3D2F] mb-1">{{ store.name }}</h3>
    <p class="text-sm text-[#4A3D2F]">{{ store.address }}</p>
    <p class="text-sm text-[#4A3D2F]">{{ store.phone }}</p>
    <p class="text-sm text-[#4A3D2F]">{{ store.hours }}</p>
  </button>
</template>

<script setup lang="ts">
import type { Store } from "../../types/stores";

defineProps<{
  store: Store;
}>();

defineEmits<{
  select: [store: Store]; // 事件名稱: [參數型別]
}>();
</script>

<style lang="scss" scoped></style>
