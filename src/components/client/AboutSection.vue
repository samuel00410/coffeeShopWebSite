<template>
  <section
    ref="sectionRef"
    class="about_section py-20 px-6 bg-linear-to-b from-hero-bottom to-hero-top"
  >
    <div class="max-w-6xl mx-auto">
      <!-- 標題 -->
      <div class="mb-16 text-center">
        <div class="inline-flex gap-3 items-center">
          <FontAwesomeIcon class="text-[#6B5444] text-2xl" :icon="faShop" />
          <h2 class="text-[#6B5444]">關於我們</h2>
        </div>
      </div>

      <!-- 內容 -->
      <div class="about_content">
        <!-- 第一排 -->
        <div
          class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16"
        >
          <div class="relative col-span-6">
            <div
              class="overflow-hidden shadow-[0_6px_0_0_#FFE5D1] border-3 border-[#FFE5D1] rounded-3xl"
            >
              <img
                class="w-full aspect-4/3 object-cover"
                :src="aboutImg1"
                alt="aboutImg"
              />
            </div>

            <!-- 動物貼圖 -->
            <div
              class="absolute bottom-0 -right-6 w-24 lg:w-28 scale-x-[-1]"
              :class="{ 'shiba-animate-hop-in': isVisible }"
            >
              <img :src="dogImg" alt="柴犬搖尾巴" />
            </div>
          </div>
          <div class="col-span-6">
            <div class="flex items-end justify-between mb-6">
              <h3 class="text-[#4A3D2F]">開放 & 便利的空間</h3>

              <!-- 動物貼圖 -->
              <div
                class="w-24 scale-x-[-1]"
                :class="{ 'animal-animate-popup-1': isVisible }"
              >
                <img :src="peekImg" alt="偷窺柴" />
              </div>
            </div>
            <div class="space-y-6 text-[#6B5444] text-lg">
              <div
                class="flex items-start gap-3 p-5 bg-white rounded-2xl border-2 border-[#FFE5D1]"
              >
                <span class="text-[#FFD4B0] text-xl mt-0.5">✓</span>
                <span>擁有寬敞的座位與絕佳的採光，與您一起度過愜意的午後</span>
              </div>
              <div
                class="flex items-start gap-3 p-5 bg-white rounded-2xl border-2 border-[#FFE5D1]"
              >
                <span class="text-[#FFD4B0] text-xl mt-0.5">✓</span>
                <span>提供穩定 Wifi 、充電插座，供用餐者使用</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 第二排 -->
        <div
          class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16"
        >
          <div class="col-span-6 order-2 lg:order-1">
            <div class="flex items-end gap-6 mb-6">
              <h3 class="text-[#4A3D2F]">舒適 & 悠閒的場所</h3>

              <!-- 動物貼圖 -->
              <div
                class="w-24"
                :class="{ 'animal-animate-popup-2': isVisible }"
              >
                <img :src="eatSlaveImg" alt="無尾熊吃草圖" />
              </div>
            </div>

            <div class="space-y-6 text-[#6B5444] text-lg">
              <div
                class="flex items-start gap-3 p-5 bg-white rounded-2xl border-2 border-[#FFE5D1]"
              >
                <span class="text-[#FFD4B0] text-xl mt-0.5">✓</span>
                <span>本店採半自助式，免收服務費</span>
              </div>
              <div
                class="flex items-start gap-3 p-5 bg-white rounded-2xl border-2 border-[#FFE5D1]"
              >
                <span class="text-[#FFD4B0] text-xl mt-0.5">✓</span>
                <span>歡迎一個人獨處，請回歸心靈原像</span>
              </div>
            </div>
          </div>

          <div class="relative col-span-6 order-1 lg:order-2">
            <div
              class="overflow-hidden shadow-[0_6px_0_0_#FFE5D1] border-3 border-[#FFE5D1] rounded-3xl"
            >
              <img
                class="w-full aspect-4/3 object-cover"
                :src="aboutImg2"
                alt="aboutImg"
              />
            </div>

            <!-- 動物貼圖 -->
            <div
              class="absolute -bottom-2 -left-6 w-24 lg:w-32"
              :class="{ 'koala-animate-crawl-in': isVisible }"
            >
              <img :src="slaveImg" alt="無尾熊貼圖" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useElementVisibility } from "@vueuse/core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import aboutImg1 from "../../assets/images/about/about1.jpg";
import aboutImg2 from "../../assets/images/about/about2.jpg";
import peekImg from "../../assets/images/about/peek.png";
import slaveImg from "../../assets/images/about/slave.png";
import eatSlaveImg from "../../assets/images/about/eatSlave.png";
import dogImg from "../../assets/images/about/dog.png";

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

@keyframes dog-hop-in {
  0% {
    opacity: 0;
    transform: translateX(-80px) scale(0);
  }

  15% {
    opacity: 1;
    transform: translateX(-80px) scale(1);
  }

  /* 第一跳 */
  30% {
    transform: translateX(-70px) translateY(-35px) scale(1.1);
  }
  40% {
    transform: translateX(-50px) translateY(0) scale(0.95);
  }

  /* 第二跳 */
  55% {
    transform: translateX(-30px) translateY(-30px) scale(1.08);
  }
  65% {
    transform: translateX(-15px) translateY(0) scale(0.97);
  }

  /* 第三跳（小跳） */
  80% {
    transform: translateX(-5px) translateY(-20px) scale(1.05);
  }
  90% {
    transform: translateX(0) translateY(0) scale(0.98);
  }

  /* 穩定 */
  100% {
    transform: translateX(0) translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes koala-crawl {
  0% {
    opacity: 0;
    transform: translateX(-150px) translateY(10px);
  }

  5% {
    opacity: 1;
  }

  /* 第一段爬行 */
  15% {
    transform: translateX(-110px) translateY(8px);
  }
  20% {
    transform: translateX(-100px) translateY(10px);
  }

  /* 停顿休息 */
  35% {
    transform: translateX(-100px) translateY(10px);
  }

  /* 第二段爬行 */
  50% {
    transform: translateX(-60px) translateY(8px);
  }
  55% {
    transform: translateX(-50px) translateY(10px);
  }

  /* 停顿休息 */
  65% {
    transform: translateX(-50px) translateY(10px);
  }

  /* 最后冲刺 */
  80% {
    transform: translateX(-10px) translateY(8px);
  }
  90% {
    transform: translateX(-2px) translateY(10px);
  }

  100% {
    transform: translateX(0) translateY(10px);
    opacity: 1;
  }
}

.shiba-animate-hop-in {
  animation: dog-hop-in 1.5s ease-in-out forwards;
  animation-delay: 1.2s;
  opacity: 0;
}

.koala-animate-crawl-in {
  animation: koala-crawl 2s ease-in-out forwards;
  animation-delay: 1.6s;
  opacity: 0;
}

.animal-animate-popup-1 {
  animation: bounce-popup 0.5s ease-in-out forwards;
  animation-delay: 0.4s;
  opacity: 0;
}

.animal-animate-popup-2 {
  animation: bounce-popup 0.5s ease-in-out forwards;
  animation-delay: 0.8s;
  opacity: 0;
}
</style>
