<template>
  <header
    class="sticky top-0 z-50 text-[#4A3D2F] bg-linear-to-b from-[#FFFBF5] via-[#FFF9F0] to-[#FFF9F0]/80 backdrop-blur-sm border-b-2 border-[#4A3D2F]"
  >
    <nav class="navbar container mx-auto">
      <div class="navbar-start">
        <!-- Logo -->
        <button
          @click="backToHome()"
          class="flex items-center gap-2 hover:cursor-pointer"
        >
          <div class="w-16 h-16">
            <img :src="logoImg" alt="logo" />
          </div>
          <div>
            <div
              class="text-2xl sm:text-2xl font-black text-[#4A3D2F] tracking-tight -rotate-2"
            >
              麻糬咖啡館
            </div>
            <div
              class="hidden sm:block text-xs text-[#8B7A68] font-bold tracking-wide"
            >
              ☕️ Mochi Café
            </div>
          </div>
        </button>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal flex items-center gap-2 px-1">
          <li>
            <router-link class="nav-link font-black text-lg" to="/"
              >首頁</router-link
            >
          </li>
          <li>
            <router-link class="nav-link font-black text-lg" to="/menu"
              >菜單</router-link
            >
          </li>
          <li>
            <router-link class="nav-link font-black text-lg" to="/about"
              >關於我們</router-link
            >
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <!-- 手機版菜單 -->
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabindex="-1"
            class="menu menu-sm flex-col gap-3 dropdown-content bg-[#FFFBF5] rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li><router-link to="/">首頁</router-link></li>
            <li><router-link to="/menu">菜單</router-link></li>
            <li><router-link to="/about">關於我們</router-link></li>
          </ul>
        </div>
        <router-link to="/cart" class="btn btn-ghost">
          <ShoppingCartIcon class="h-6 w-6" />
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ShoppingCartIcon } from "@heroicons/vue/24/outline";
import logoImg from "../assets/images/hero/s0126_27_0.png";
import { useRouter } from "vue-router";
const router = useRouter();

const backToHome = () => {
  router.push("/");
};
</script>

<style scoped>
.nav-link {
  @apply rounded-full transition-all duration-300 text-[#6B5444] hover:bg-[#FFF5E8];
}

.router-link-exact-active {
  @apply bg-[#FFD4B0] text-[#4A3D2F] shadow-[0_4px_0_0_#C4A68A]  border-3 border-[#4A3D2F] rounded-full;
}
</style>
