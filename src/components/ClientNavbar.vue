<template>
  <div class="bg-nav text-[#8B7E74]">
    <nav class="navbar container mx-auto">
      <div class="navbar-start">
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
          <!-- 手機版菜單 -->
          <ul
            tabindex="-1"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li><router-link to="/">首頁</router-link></li>
            <li><router-link to="/menu">菜單</router-link></li>
            <li><router-link to="/about">關於我們</router-link></li>
          </ul>
        </div>
        <router-link to="#" class="btn btn-ghost text-xl">I Coffee</router-link>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><router-link to="/">首頁</router-link></li>
          <li>
            <router-link to="/menu">菜單</router-link>
          </li>
          <li><router-link to="/about">關於我們</router-link></li>
        </ul>
      </div>
      <div class="navbar-end">
        <router-link to="/cart" class="btn btn-ghost">
          <ShoppingCartIcon class="h-6 w-6" />
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ShoppingCartIcon } from "@heroicons/vue/24/outline";
</script>
