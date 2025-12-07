<template>
  <section class="featured-menu-section bg-hero-bottom">
    <div class="container mx-auto py-12 text-center">
      <!-- 文字區塊 -->
      <div class="mb-16 flex-col items-center justify-center">
        <div
          class="mb-10 inline-flex items-center gap-2 bg-white shadow-[0_6px_0_0_#E8DBC8] border-4 border-[#4A3D2F] rounded-full px-[16px] py-[8px] -rotate-2"
        >
          <div class="w-10 h-10">
            <img :src="titleImg" class="w-full h-auto rotate-y-180" />
          </div>
          <p class="text-lg font-black text-[#4A3D2F]">推薦菜單</p>
          <div class="w-10 h-10">
            <img :src="titleImg" class="w-full h-auto" />
          </div>
        </div>

        <div class="flex items-start justify-center gap-2">
          <h2 class="mb-6 rotate-1 text-4xl font-black text-black">本週特選</h2>
          <SparklesIcon class="h-12 w-12 text-amber-400" />
        </div>

        <p className="text-[#6B5444] text-xl font-bold">
          用心製作的特別菜單請您品嚐
        </p>
      </div>

      <!-- 菜單卡片區塊 -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 place-items-center"
      >
        <FeaturedCard v-for="(item, index) in 3" :key="index" />
      </div>

      <button class="btn-primary px-6 py-6">查看完整菜單 →</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { SparklesIcon } from "@heroicons/vue/24/solid";
import titleImg from "../../assets/images/featuredMenu/s0134_31_1.png";
import FeaturedCard from "./FeaturedCard.vue";
</script>
