<template>
  <div class="flex items-center justify-between">
    <h2 class="text-2xl font-bold">文章</h2>
    <button class="btn btn-primary" @click="openModal()">新增文章</button>
  </div>
</template>

<script setup lang="ts">
const openModal = () => {
  console.log("打開新增彈窗");
};
</script>
