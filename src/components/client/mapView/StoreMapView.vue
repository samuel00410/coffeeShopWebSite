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

<style lang="scss" scoped>
// 關閉按鈕那整排 → 做成深棕色標題列
:deep(.gm-style-iw-chr) {
  background-color: #4a3d2f;
  border-radius: 12px 12px 0 0; // 只有上方圓角
  padding: 4px 4px 4px 12px;
}

// 關閉按鈕本身 → 改成白色 X
:deep(.gm-style-iw-chr button) {
  color: white !important;
  opacity: 0.8;
}
:deep(.gm-style-iw-chr button:hover) {
  opacity: 1;
}

:deep(.gm-style .gm-style-iw-c) {
  background-color: #fff5e8;
  border-radius: 16px;
  box-shadow: 0 6px 0 0 #e8dbc8;
  padding: 0 !important;
}
</style>
