<template>
  <section
    class="hero relative min-h-screen bg-linear-to-b from-hero-top via-background to-hero-bottom flex items-center justify-center overflow-hidden"
  >
    <!-- 背景圖 -->
    <div class="absolute inset-0">
      <div
        v-for="(slide, index) in slides"
        :key="slide.title"
        class="absolute inset-0 transition-opacity duration-700"
        :class="index === currentSlide ? 'opacity-100' : 'opacity-0'"
      >
        <img
          :src="slide.image"
          :alt="slide.title"
          class="h-full w-full object-cover"
        />
        <!-- 米色遮罩層 -->
        <div
          class="absolute inset-0 bg-linear-to-b from-[#FFF9F0]/85 via-[#FFF5E8]/80 to-[#FFF9F0]/90 opacity-80"
        ></div>
      </div>
    </div>
    <!-- 底部漸層 -->
    <div
      class="absolute inset-0 bg-linear-to-t from-hero-bottom to-transparent pointer-events-none"
    ></div>

    <!-- 內容區 -->
    <Transition name="fade-up" mode="out-in">
      <div
        :key="currentSlide"
        class="hero_content relative z-10 flex flex-col items-center text-center"
      >
        <div
          class="px-10 py-4 mb-10 border-4 border-[#4A3D2F] rounded-full bg-white text-xl font-black text-[#6B5444] -rotate-2"
        >
          <span class="flex items-center justify-center gap-2">
            <span class="text-2xl">☕️</span>
            麻糬咖啡館
          </span>
        </div>
        <h1 class="text-title font-black mb-6 text-[#4A3D2F] -rotate-1">
          {{ current.title }}
        </h1>
        <h2
          class="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-[#FFB890] to-[#FFC098] mb-10 rotate-1"
        >
          {{ current.subtitle }}
        </h2>
        <p
          class="text-lg text-[#6B5444] mb-14 max-w-2xl mx-auto leading-relaxed font-bold"
        >
          {{ current.description }}
        </p>

        <button class="px-6 py-3 btn-primary">查看菜單 →</button>
      </div>
    </Transition>

    <button
      type="button"
      @click="prevSlide"
      class="hidden absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 font-black text-5xl rounded-full border-4 bg-white/90 text-[#4A3D2F] sm:flex items-center justify-center shadow hover:scale-110 hover:bg-[#FFD4B0] active:scale-95 transition duration-300"
    >
      <span class="relative top-[-3px]">‹</span>
    </button>

    <button
      type="button"
      @click="nextSlide"
      class="hidden absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 font-black text-5xl rounded-full border-4 bg-white/90 text-[#4A3D2F] sm:flex items-center justify-center shadow hover:scale-110 hover:bg-[#FFD4B0] active:scale-95 transition duration-300"
    >
      <span class="relative top-[-3px]">›</span>
    </button>

    <!-- 小章魚動畫 -->
    <div class="mascot-wrapper">
      <div class="mascot-float">
        <img :src="mascotImg" alt="招呼小章魚" class="mascot-img" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import slideImg1 from "../../assets/images/hero/slideImg1.jpg";
import slideImg2 from "../../assets/images/hero/slideImg2.jpg";
import slideImg3 from "../../assets/images/hero/slideImg3.jpg";
import mascotImg from "../../assets/images/hero/s0031_6_2.png";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: slideImg1,
    title: "療癒空間",
    subtitle: "寧靜時光",
    description: "能夠悠閒度過美好時光的特別場所",
  },
  {
    image: slideImg2,
    title: "用心製作",
    subtitle: "每一杯都精心調製",
    description: "嚴選咖啡豆，呈現最佳風味",
  },
  {
    image: slideImg3,
    title: "講究食材",
    subtitle: "永續經營",
    description: "使用環保且精選的優質食材",
  },
];

const currentSlide = ref(0);

let timer: ReturnType<typeof setInterval> | null = null;
const current = computed(() => {
  return slides[currentSlide.value];
});

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};

const startAutoPlay = () => {
  timer = setInterval(() => {
    nextSlide();
  }, 5000);
};

onMounted(() => {
  startAutoPlay();
});

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
.mascot-wrapper {
  position: absolute;
  right: 6rem;
  bottom: 6rem;
  width: 128px;
  height: 128px;
  z-index: 20;

  &:hover {
    cursor: pointer;
    animation: mascot-jump 0.25s ease 0s 2;
  }
}

@media (max-width: 640px) {
  .mascot-wrapper {
    width: 80px;
    height: 80px;
    right: 1rem;
  }
}

.mascot-wrapper::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: radial-gradient(
    circle,
    rgba(255, 212, 176, 0.55),
    rgba(255, 212, 176, 0)
  );
  filter: blur(4px);
  animation: mascot-glow 3.2s ease-in-out infinite;
}

.mascot-float {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: mascot-float 2.4s ease-in-out infinite;
}

.mascot-img {
  width: 100%;
  height: auto;
  transform-origin: center bottom;
  animation: mascot-wiggle 2.6s ease-in-out infinite;
}

/* ----- 動畫相關 ----- */
@keyframes mascot-glow {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.08);
  }
}

@keyframes mascot-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes mascot-wiggle {
  0%,
  100% {
    transform: translateX(0) scale(1) rotate(0deg);
  }
  25% {
    transform: translateX(-2px) scale(1.02) rotate(-2deg);
  }
  50% {
    transform: translateX(0) scale(1.03) rotate(0.5deg);
  }
  75% {
    transform: translateX(2px) scale(1.02) rotate(2deg);
  }
}

@keyframes mascot-jump {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.fade-up-enter-to,
.fade-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
