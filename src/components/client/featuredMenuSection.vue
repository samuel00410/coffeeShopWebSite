<template>
  <section ref="sectionRef" class="featured-menu-section bg-hero-bottom">
    <div class="container mx-auto py-12 text-center">
      <!-- 文字區塊 -->
      <div ref="textRef">
        <Transition name="text-fade">
          <div
            v-if="isTextVisible"
            class="mb-16 flex-col items-center justify-center"
          >
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
              <h2 class="mb-6 rotate-1 text-4xl font-black text-black">
                本週特選
              </h2>
              <SparklesIcon class="h-12 w-12 text-amber-400" />
            </div>

            <p className="text-[#6B5444] text-xl font-bold">
              用心製作的特別菜單請您品嚐
            </p>
          </div>
        </Transition>
      </div>

      <!-- 菜單卡片區塊 -->
      <TransitionGroup
        name="fade"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 place-items-center"
      >
        <FeaturedCard
          v-for="(item, index) in isCardVisible ? cardData : []"
          :key="item.id"
          :card="item"
          :style="{ transitionDelay: `${index * 0.25}s` }"
        />
      </TransitionGroup>

      <div ref="btnRef">
        <Transition name="btn-fade">
          <button v-if="isBtnVisible" class="btn-primary px-6 py-6">
            查看完整菜單 →
          </button>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useElementVisibility } from "@vueuse/core";
import { SparklesIcon } from "@heroicons/vue/24/solid";
import titleImg from "../../assets/images/featuredMenu/s0134_31_1.png";
import feProduct1 from "../../assets/images/featuredMenu/feProduct1.jpg";
import feProduct2 from "../../assets/images/featuredMenu/feProduct2.jpg";
import feProduct3 from "../../assets/images/featuredMenu/feProduct3.jpg";
import FeaturedCard from "./FeaturedCard.vue";

const itmes = [
  {
    id: 1,
    imageUrl: feProduct1,
    title: "世界冠軍拿鐵",
    description: "推薦給不喜歡咖啡苦味的你 (有附捲心酥哦 ! )",
    origin_price: 120,
  },
  {
    id: 2,
    imageUrl: feProduct2,
    title: "麻糬厚奶茶",
    description: "香濃厚奶茶搭配Q彈麻糬，甜而不膩的絕妙組合！",
    origin_price: 100,
  },
  {
    id: 3,
    imageUrl: feProduct3,
    title: "抹茶紅豆冰沙",
    description: "清涼抹茶冰沙融合甜蜜紅豆，夏日消暑首選！",
    origin_price: 130,
  },
];

onMounted(() => {
  cardData.value = itmes;
});

const cardData: any = ref([]);

const sectionRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);
const btnRef = ref<HTMLElement | null>(null);
const isCardVisible = useElementVisibility(sectionRef);
const isTextVisible = useElementVisibility(textRef);
const isBtnVisible = useElementVisibility(btnRef);

watch(isCardVisible, (newVal) => {
  if (newVal) {
    cardData.value = [...itmes];
  } else {
    cardData.value = [];
  }
});
</script>

<style scoped>
/*  標題文字動畫 */
.text-fade-enter-active,
.text-fade-leave-active {
  transition: opacity 1.5s ease, transform 1.5s ease;
}
.text-fade-enter-from,
.text-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.text-fade-enter-to,
.text-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/*  卡片動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2.5s ease, transform 2.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/*  按鈕動畫 */
.btn-fade-enter-active,
.btn-fade-leave-active {
  transition: opacity 1.5s ease, transform 1.5s ease;
}

.btn-fade-enter-from,
.btn-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.btn-fade-enter-to,
.btn-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
