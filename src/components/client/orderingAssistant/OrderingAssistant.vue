<!-- 點餐小助手容器 -->
<template>
  <!-- 聊天視窗 -->
  <div
    class="fixed bottom-6 right-6 z-999 flex flex-col overflow-hidden w-[370px] max-h-[600px] bg-white rounded-2xl shadow-[0_10px_0_0_#e8dbc8] border-[3px] border-[#4a3d2f]"
  >
    <!-- Header -->
    <div class="flex items-center gap-[10px] bg-[#FFD4B0] px-4 py-3">
      <div
        class="w-[45px] h-[45px] bg-white border-[2.5px] border-[#4a3d2f] rounded-full overflow-hidden shadow-[0_3px_0_0_#e8dbc8] flex items-center justify-center"
      >
        <img :src="footerImg" class="w-[35px] h-[35px] object-contain" alt="" />
      </div>
      <div class="flex-1">
        <p class="text-[15px] font-black text-[#4a3d2f] leading-tight">
          🌰 點餐小幫手
        </p>

        <p class="text-[11px] text-[#8b7a68] flex items-center gap-1 mt-0.5">
          <span
            class="w-[7px] h-[7px] inline-block bg-[#5ac97f] rounded-full"
          ></span>
          麻糬咖啡館線上服務中
        </p>
      </div>
      <button
        class="w-[30px] h-[30px] bg-white border-[2.5px] border-[#4a3d2f] rounded-full text-[14px] font-black text-[#4a3d2f] flex items-center justify-center shrink-0 shadow-[0_2px_0_0_#e8dbc8] hover:bg-[#ffe0e0] hover:scale-110 transition-all duration-200 cursor-pointer"
      >
        ✕
      </button>
    </div>

    <!-- Messages 捲動區 -->
    <div
      class="flex-1 overflow-y-auto scroll-smooth px-[14px] py-[16px] oa-messages"
    >
      <div class="flex flex-col gap-[12px]">
        <!-- 機器人氣泡 -->
        <div class="flex items-end gap-2">
          <div
            class="w-[30px] h-[30px] shrink-0 bg-[#ffe5d1] border-2 border-[#4a3d2f] rounded-full overflow-hidden flex items-center justify-center mb-[2px]"
          >
            <img
              :src="footerImg"
              class="w-[22px] h-[22px] object-contain"
              alt=""
            />
          </div>
          <div
            class="max-w-[82%] bg-[#fff9f0] border-[2.5px] border-[#4a3d2f] rounded-[16px_16px_16px_4px] px-[14px] py-[10px] text-[13.5px] font-medium text-[#6b5444] leading-[1.55] shadow-[0_3px_0_0_#e8dbc8]"
          >
            你好！☕ 今天想喝什麼呢？
          </div>
        </div>

        <!-- 使用者氣泡 -->
        <div class="flex items-end justify-end gap-2">
          <div
            class="max-w-[82%] bg-[#fff9f0] border-[2.5px] border-[#4a3d2f] rounded-[16px_16px_4px_16px] px-[14px] py-[10px] text-[13.5px] font-bold text-[#4a3d2f] leading-[1.55] shadow-[0_3px_0_0_#c4a68a]"
          >
            咖啡飲品
          </div>
        </div>

        <!-- 使用者氣泡 -->
        <div class="flex items-end justify-end gap-2">
          <div
            class="max-w-[82%] bg-[#fff9f0] border-[2.5px] border-[#4a3d2f] rounded-[16px_16px_4px_16px] px-[14px] py-[10px] text-[13.5px] font-bold text-[#4a3d2f] leading-[1.55] shadow-[0_3px_0_0_#c4a68a]"
          >
            咖啡飲品
          </div>
        </div>
        <!-- 使用者氣泡 -->
        <div class="flex items-end justify-end gap-2">
          <div
            class="max-w-[82%] bg-[#fff9f0] border-[2.5px] border-[#4a3d2f] rounded-[16px_16px_4px_16px] px-[14px] py-[10px] text-[13.5px] font-bold text-[#4a3d2f] leading-[1.55] shadow-[0_3px_0_0_#c4a68a]"
          >
            咖啡飲品
          </div>
        </div>
        <!-- 使用者氣泡 -->
        <div class="flex items-end justify-end gap-2">
          <div
            class="max-w-[82%] bg-[#fff9f0] border-[2.5px] border-[#4a3d2f] rounded-[16px_16px_4px_16px] px-[14px] py-[10px] text-[13.5px] font-bold text-[#4a3d2f] leading-[1.55] shadow-[0_3px_0_0_#c4a68a]"
          >
            咖啡飲品
          </div>
        </div>

        <!-- 打字中 -->
        <div class="flex items-end gap-2">
          <div
            class="w-[30px] h-[30px] shrink-0 bg-[#ffe5d1] border-2 border-[#4a3d2f] rounded-full overflow-hidden flex items-center justify-center mb-[2px]"
          >
            <img
              :src="footerImg"
              class="w-[22px] h-[22px] object-contain"
              alt=""
            />
          </div>
          <div
            class="flex items-center gap-[5px] bg-[#fff9f0] border-[2.5px] border-[#4a3d2f] rounded-[16px_16px_16px_4px] px-4 py-3 shadow-[0_3px_0_0_#e8dbc8]"
          >
            <span class="oa-dot"></span>
            <span class="oa-dot"></span>
            <span class="oa-dot"></span>
          </div>
        </div>

        <!-- 選項按鈕組 -->
        <div class="flex flex-wrap gap-2 pl-[38px]">
          <button
            class="bg-white border-[2.5px] border-[#4a3d2f] rounded-full px-3.5 py-[7px] text-[12.5px] font-bold text-[#4a3d2f] cursor-pointer whitespace-nowrap shadow-[0_3px_0_0_#e8dbc8] transition-all duration-200 hover:bg-[#ffe5d1] hover:shadow-[0_5px_0_0_#c4a68a] hover:-translate-y-0.5 active:translate-y-px active:shadow-[0_1px_0_0_#e8dbc8]"
          >
            咖啡
          </button>
        </div>

        <!-- 推薦商品卡 -->
        <div
          class="ml-[38px] flex bg-white border-[2.5px] border-[#4a3d2f] rounded-2xl shadow-[0_4px_0_0_#e8dbc8] overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-[0_7px_0_0_#e8dbc8] hover:-translate-y-[3px]"
        >
          <div
            class="w-[68px] shrink-0 bg-[#ffe5d1] border-r-2 border-[#4a3d2f] flex items-center justify-center text-[28px]"
          >
            ☕
          </div>
          <div class="flex-1 p-2 flex flex-col gap-[3px]">
            <p
              class="text-[13px] font-black text-[#4a3d2f] flex items-center gap-1 flex-wrap"
            >
              <span
                class="bg-[#ffe0e0] border-[1.5px] border-[#4a3d2f] rounded-full px-1.5 text-[10px] font-black shadow-[0_2px_0_0_#ffb0b0]"
                >熱門</span
              >
              經典拿鐵
            </p>
            <p class="text-[11px] text-[#8b7a68] leading-[1.4]">
              醇厚義式濃縮，搭配新鮮奶泡
            </p>
            <div class="flex items-center justify-between mt-1">
              <span class="text-[13px] font-black text-[#f7b27a]">NT$130</span>
              <button
                class="w-[26px] h-[26px] bg-[#ffd4b0] border-2 border-[#4a3d2f] rounded-full text-[16px] font-black text-[#4a3d2f] flex items-center justify-center shadow-[0_2px_0_0_#c4a68a] cursor-pointer transition-all duration-200 hover:bg-[#ffc098] hover:scale-[1.15]"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div
      class="border-t-[3px] border-[#4a3d2f] bg-[#fff9f0] px-[12px] py-[10px] flex items-center gap-[8px]"
    >
      <input
        type="text"
        placeholder="輸入訊息..."
        class="flex-1 bg-white border-[2.5px] border-[#4a3d2f] rounded-full px-3.5 py-2 font-sans text-[13px] text-[#4a3d2f] outline-none transition-all duration-200 placeholder:text-[#d4c4a8] focus:border-[#f7b27a] focus:shadow-[0_3px_0_0_#c4a68a]"
      />
      <button
        class="w-[38px] h-[38px] bg-[#ffd4b0] border-[2.5px] border-[#4a3d2f] rounded-full flex items-center justify-center text-[#4a3d2f] text-base shadow-[0_3px_0_0_#c4a68a] cursor-pointer transition-all duration-200 hover:bg-[#ffc098] hover:shadow-[0_5px_0_0_#c4a68a] hover:-translate-y-0.5"
      >
        ➤
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import footerImg from "../../../assets/images/footer/s0121_22_3.png";
</script>

<style lang="scss" scoped>
.oa-dot {
  display: block;
  width: 7px;
  height: 7px;
  background-color: #d4c4a8;
  border-radius: 50%;

  animation: dot-bounce 1.2s ease infinite;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
}

@keyframes dot-bounce {
  0%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-6px);
  }
}

.oa-messages {
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #d4c4a8;
    border-radius: 99px;
  }
}
</style>
