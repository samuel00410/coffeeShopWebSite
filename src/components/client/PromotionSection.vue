<template>
  <section ref="sectionRef" class="promotion-section py-20 px-6 bg-hero-bottom">
    <div class="max-w-6xl mx-auto">
      <!-- 標題 -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-3">
          <font-awesome-icon class="text-[#6B5444] text-2xl" :icon="faTicket" />

          <h2 class="text-[#6B5444]">優惠訊息</h2>
        </div>
      </div>

      <!-- 內容 -->
      <div class="relative">
        <div
          class="bg-white overflow-hidden rounded-4xl shadow-[0_8px_0_0_#FFE5D1] border-3 border-[#FFD4B0]"
        >
          <div class="grid grid-cols-1 lg:grid-cols-12">
            <div class="lg:col-span-5 h-[380px] lg:h-full">
              <img class="w-full h-full object-cover" :src="penguinImg" />
            </div>

            <div
              class="relative lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center"
            >
              <div
                class="bg-linear-to-r from-[#FFE5D1] to-[#FFD4B0] rounded-2xl px-6 py-4 mb-8 border-2 border-[#FFD4B0]"
              >
                <p class="text-[#6B5444] text-lg font-medium">
                  + 麻糬 Sugar Cafe Bar 周年慶，期間消費全館
                  <span class="font-black text-[#4A3D2F]">85 折</span>！
                </p>
              </div>

              <div class="space-y-6 text-[#6B5444]">
                <p class="text-xl font-medium">🎉 尋寶活動開始囉！</p>

                <p class="text-lg leading-relaxed">
                  找到圖片中的「小松鼠」，並拍照打卡即可享有 9 折優惠～
                </p>

                <div class="border-t-2 border-[#FFE5D1] pt-6 mt-6">
                  <p class="text-[#8B7A68]">來一杯咖啡，與您度過愜意時光 ☕</p>
                </div>
              </div>

              <!-- 小松鼠貼圖 -->
              <div
                class="hidden lg:block absolute bottom-0 -left-12 z-10 w-24 scale-x-[-1]"
                :class="{ 'animate-animal-popup-2': isVisible }"
              >
                <img :src="squirrelImg1" alt="小松鼠貼圖" />
              </div>
            </div>
          </div>
        </div>

        <!-- 小松鼠貼圖 -->
        <div
          class="absolute bottom-0 right-0 w-24 scale-x-[-1]"
          :class="{ 'animate-animal-popup-3': isVisible }"
        >
          <img :src="squirrelImg3" alt="小松鼠貼圖" />
        </div>

        <div
          class="absolute -top-16 right-1/4 -translate-x-1/2 w-24"
          :class="{ 'animate-animal-popup-1': isVisible }"
        >
          <img :src="squirrelImg2" alt="小松鼠貼圖" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useElementVisibility } from "@vueuse/core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import penguinImg from "../../assets/images/promotion/penguin.jpg";
import squirrelImg1 from "../../assets/images/promotion/squirrel1.png";
import squirrelImg2 from "../../assets/images/promotion/squirrel2.png";
import squirrelImg3 from "../../assets/images/promotion/squirrel3.png";

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = useElementVisibility(sectionRef);
</script>

<style scoped>
@keyframes bounce-popup {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.4);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-animal-popup-1 {
  animation: bounce-popup 0.5s ease-in forwards;
  animation-delay: 0.2s;
  opacity: 0;
}

.animate-animal-popup-2 {
  animation: bounce-popup 0.5s ease-in forwards;
  animation-delay: 0.4s;
  opacity: 0;
}

.animate-animal-popup-3 {
  animation: bounce-popup 0.5s ease-in forwards;
  animation-delay: 0.6s;
  opacity: 0;
}
</style>
