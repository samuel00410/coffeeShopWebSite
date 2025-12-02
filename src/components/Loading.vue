<template>
  <div
    v-if="active"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <span class="loading loading-bars text-accent"></span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  active: boolean;
}>();
</script>
