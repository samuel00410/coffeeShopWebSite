<template>
  <div
    class="card group relative max-w-[420px] h-[600px] bg-white overflow-hidden shadow-[0_6px_0_0_#E8DBC8] transition-all duration-300 hover:shadow-[0_10px_0_0_#E8DBC8] rounded-[2rem] border-4 border-[#4A3D2F] hover:-translate-y-1 cursor-pointer"
  >
    <!-- 熱門標籤 -->
    <div
      class="absolute top-4 right-4 z-10 px-4 py-1 bg-[#FFE0E0] text-[#4A3D2F] shadow-[0_4px_0_0_#C4A68A] border-3 border-[#4A3D2F] rounded-full rotate-6 group-hover:rotate-12 transition-transform"
    >
      <div class="flex items-center gap-1">
        <StarIcon class="w-4 h-4 text-[#FFD700]" />
        <span class="text-#4A3D2F text-xs font-black"> 熱門 </span>
      </div>
    </div>

    <!-- 圖片 -->
    <figure class="overflow-hidden">
      <img
        class="group-hover:scale-110 transition-transform duration-500"
        :src="feProduct1"
        alt="特選產品"
      />
    </figure>
    <div class="card-body">
      <div>
        <h2 class="card-title text-card-title">世界冠軍拿鐵</h2>
        <p
          class="mb-5 text-left text-card-description line-clamp-2 leading-relaxed font-medium"
        >
          推薦給不喜歡咖啡苦味的你 (有附捲心酥哦 ! )
        </p>
      </div>
      <div
        class="card-actions items-center justify-between pt-4 border-t-3 border-[#FFF5E8] border-dashed"
      >
        <div className="flex flex-col">
          <span
            className="text-xs text-[#8B7A68] font-black mb-1 flex items-center gap-1"
          >
            💰 價格
          </span>
          <span className="text-xl font-black text-[#6B5444]"
            >$NT 120 / 杯</span
          >
        </div>
        <button class="btn-primary px-4 py-2 text-sm">+ 加入</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import feProduct1 from "../../assets/images/featuredMenu/feProduct1.jpg";
import { StarIcon } from "@heroicons/vue/24/solid";
</script>

<style scoped></style>
