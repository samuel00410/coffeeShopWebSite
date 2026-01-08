<template>
  <div class="min-h-screen flex flex-col items-center gap-6 py-30">
    <div class="w-75">
      <img :src="notFoundImg" class="w-full" />
    </div>
    <h2 class="text-[#6B5444]">糟糕，找不到您的頁面唷!</h2>
    <button
      class="btn-primary px-30 py-2"
      @click="$router.push({ name: 'Home' })"
    >
      回首頁
    </button>
  </div>
</template>

<script setup>
import notFoundImg from "../../assets/images/NotFound/notFound.png";
</script>
