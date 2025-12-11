<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-background opacity-80 z-50"
  >
    <div>
      <img :src="Cutie_Fox" class="w-50 h-50" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Cutie_Fox from "../../assets/images/loading/Cutie_Fox.gif";

const props = defineProps<{
  show: boolean;
}>();
</script>
