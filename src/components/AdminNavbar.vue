<template>
  <div class="navbar bg-neutral text-neutral-content shadow-lg">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
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
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52"
        >
          <li>
            <router-link to="/admin/dashboard">首頁</router-link>
          </li>
          <li>
            <router-link to="/admin/products">產品管理</router-link>
          </li>
          <li>
            <router-link to="#">訂單管理</router-link>
          </li>
        </ul>
      </div>
      <router-link to="/admin/dashboard" class="btn btn-ghost text-xl">
        ☕ 咖啡後台
      </router-link>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li>
          <router-link to="/admin/dashboard" class="font-medium">
            首頁
          </router-link>
        </li>
        <li>
          <router-link to="/admin/products" class="font-medium">
            產品管理
          </router-link>
        </li>
        <li>
          <router-link to="#" class="font-medium"> 訂單管理 </router-link>
        </li>
      </ul>
    </div>

    <div class="navbar-end">
      <button @click="logOut" class="btn btn-ghost btn-sm">
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
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span class="hidden sm:inline ml-1">登出</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const logOut = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("hexToken");

  try {
    const res = await axios.post(
      `${apiUrl}/logout`,
      {},
      { headers: { Authorization: token } }
    );
    if (res.data.success) {
      router.push("/login");
    }
  } catch (err) {
    console.error("登出失敗:", err);
  } finally {
    localStorage.removeItem("hexToken");
    localStorage.removeItem("hexTokenExpired");
  }
};
</script>
