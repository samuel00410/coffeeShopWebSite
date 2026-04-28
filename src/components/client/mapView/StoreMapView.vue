<template>
  <div ref="mapEl" class="w-full h-full min-h-[500px]"></div>
</template>

<script setup lang="ts">
import type { Store } from "../../../types/stores";
import { ref, onMounted } from "vue";
import { useGoogleMap } from "../../../composables/useGoogleMap";

const { initMap, panTo } = useGoogleMap();

const props = defineProps<{
  stores: Store[];
}>();

onMounted(async () => {
  if (mapEl.value) {
    await initMap(mapEl.value, props.stores); // 初始化地圖，並傳入門市資料以顯示標記 (沒有 await，可能會導致地圖尚未完全初始化就嘗試使用 panTo，造成錯誤)
  }
});

const mapEl = ref(null);

defineExpose({ panTo });
</script>

<style lang="scss" scoped></style>
