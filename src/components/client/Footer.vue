<template>
  <footer
    class="w-full bg-linear-to-b from-background via-[#FFF0E8] to-[#FFE8DD] mt-20 border-t-2 border-[#4A3D2F] border-opacity-10 relative"
  >
    <div class="absolute right-10 top-0 -translate-y-full opacity-80">
      <img :src="duckWalkImg" />
    </div>
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <!-- Logo + 網站名稱 -->
        <div class="space-y-6">
          <div class="flex items-center gap-4">
            <div class="w-20 h-20">
              <img :src="logoImg" alt="logo" />
            </div>
            <div>
              <p class="text-2xl font-black text-[#4A3D2F] transform -rotate-2">
                麻糬咖啡館
              </p>
              <p class="text-[#6B5444] font-bold">Mochi Café</p>
            </div>
          </div>
          <p
            class="p-4 leading-relaxed text-[#6B5444] font-medium bg-white rounded-2xl border-3 border-[#4A3D2F] shadow-[0_3px_0_0_#E8DBC8]"
          >
            溫暖心靈的美好時光 ☕️🍰
          </p>
        </div>
        <!-- 連結 -->
        <div>
          <h4
            className="mb-6 text-lg font-black text-[#4A3D2F] flex items-center gap-2"
          >
            📌 連結
          </h4>
          <ul class="space-y-3">
            <li>
              <a href="#" class="footer-link">
                <div className="footer-spot"></div>
                菜單</a
              >
            </li>
            <li>
              <a href="#" class="footer-link">
                <div class="footer-spot"></div>
                店鋪資訊
              </a>
            </li>
            <li>
              <a href="#" class="footer-link"
                ><div className="footer-spot"></div>
                召募訊息</a
              >
            </li>
            <li>
              <a href="#" class="footer-link"
                ><div className="footer-spot"></div>
                部落格</a
              >
            </li>
          </ul>
        </div>

        <!-- 客戶支援 -->
        <div>
          <h4
            className="mb-6 text-lg font-black text-[#4A3D2F] flex items-center gap-2 "
          >
            💬 客戶支援
          </h4>
          <ul class="space-y-3">
            <li>
              <a href="#" class="footer-link">
                <div className="footer-spot"></div>
                常見問題</a
              >
            </li>
            <li>
              <a href="#" class="footer-link">
                <div class="footer-spot"></div>
                配送說明
              </a>
            </li>
            <li>
              <a href="#" class="footer-link"
                ><div className="footer-spot"></div>
                退換貨</a
              >
            </li>
            <li>
              <a href="#" class="footer-link"
                ><div className="footer-spot"></div>
                聯絡我們</a
              >
            </li>
          </ul>
        </div>

        <div>
          <!-- 店舖資訊 -->
          <div class="mb-8">
            <h4
              className="mb-6 text-lg font-black text-[#4A3D2F] flex items-center gap-2 "
            >
              📍 店舖資訊
            </h4>
            <ul class="space-y-3">
              <li>
                <div href="#" class="flex gap-2 p-4 footer-description">
                  <MapPinIcon class="w-5 h-5 text-[#FFD4B0]" />
                  台北市信義區信義路五段7號
                </div>
              </li>
              <li>
                <div href="#" class="flex gap-2 p-4 footer-description">
                  <PhoneIcon class="w-5 h-5 text-[#FFD4B0]" />
                  (02) 2733-8888
                </div>
              </li>
              <li>
                <div href="#" class="flex gap-2 p-4 footer-description">
                  <ClockIcon class="w-5 h-5 text-[#FFD4B0]" />
                  <div class="flex flex-col">
                    <p>10:00 - 20:00</p>
                    <p>公休日：週二</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 追蹤我們  -->
          <div>
            <h4
              className="mb-6 text-lg font-black text-[#4A3D2F] flex items-center gap-2 "
            >
              💕 追蹤我們
            </h4>
            <div class="flex items-center gap-4">
              <a class="footer-social-icon">
                <font-awesome-icon class="text-[#FFD4B0]" :icon="faInstagram" />
              </a>
              <a class="footer-social-icon">
                <font-awesome-icon class="text-[#FFD4B0]" :icon="faFacebook" />
              </a>
              <a class="footer-social-icon">
                <font-awesome-icon class="text-[#FFD4B0]" :icon="faTwitter" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-end gap-6 mb-10">
        <img :src="footerImg" className="w-28 h-28 opacity-90 drop-shadow-lg" />
      </div>

      <div
        className="pt-8 border-t-4 border-[#4A3D2F] border-opacity-20 border-dashed text-center"
      >
        <p
          className="text-[#6B5444] font-black flex items-center justify-center gap-3 flex-wrap text-lg"
        >
          <span>© 2025 麻糬咖啡館</span>
          <span className="text-[#FFB890]">•</span>
          <span>版權所有</span>
          <span className="text-[#FFB890]">•</span>
          <span>用心製作 💕</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import logoImg from "../../assets/images/hero/s0126_27_0.png";
import footerImg from "../../assets/images/footer/s0121_22_3.png";
import duckWalkImg from "../../assets/images/footer/b_illust_49_1L.png";
import { MapPinIcon, PhoneIcon, ClockIcon } from "@heroicons/vue/24/outline";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
</script>
