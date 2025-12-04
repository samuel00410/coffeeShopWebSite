<template>
  <section class="hero relative h-screen min-h-[600px] bg-[#4b3a35]">
    <!-- 背景圖 -->
    <div class="absolute inset-0">
      <img
        :src="slideImg1"
        alt="Hero Background"
        class="h-full w-full object-cover opacity-60"
      />
    </div>
    <!-- 底部白色漸層 -->
    <div
      class="absolute inset-0 bg-linear-to-t from-white to-transparent pointer-events-none"
    ></div>

    <!-- 內容區 -->
    <div class="hero_content relative z-10">
      <p class="border border-4 rounded-full"># 麻糬咖啡館</p>
      <h2>療癒空間</h2>
      <h3>寧靜時光</h3>
      <p>能夠悠閒度過美好時光的特別場所</p>

      <button>查看菜單 →</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import slideImg1 from "../../assets/images/hero/slideImg1.jpg";
</script>

<style scoped></style>
