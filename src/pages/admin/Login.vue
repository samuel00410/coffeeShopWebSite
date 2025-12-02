<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
    <div class="card w-full max-w-md bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold text-center mb-6">
          ☕ 咖啡廳後台登入
        </h2>
        <form @submit.prevent="signIn" class="space-y-4">
          <div class="form-control">
            <label class="label" for="inputEmail">
              <span class="label-text">Email</span>
            </label>
            <input
              v-model="user.username"
              type="email"
              id="inputEmail"
              placeholder="請輸入您的 Email"
              class="input input-bordered w-full"
              required
              autofocus
            />
          </div>

          <div class="form-control">
            <label class="label" for="inputPassword">
              <span class="label-text">密碼</span>
            </label>
            <input
              v-model="user.password"
              type="password"
              id="inputPassword"
              placeholder="請輸入密碼"
              class="input input-bordered w-full"
              required
            />
          </div>

          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary w-full">登入</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const apiUrl = import.meta.env.VITE_API_URL;

const user = ref({
  username: "",
  password: "",
});

const signIn = async () => {
  try {
    const res = await axios.post(`${apiUrl}/admin/signin`, user.value);

    const { token, expired } = res.data;
    if (res.data.success) {
      localStorage.setItem("hexToken", token);
      localStorage.setItem("hexTokenExpired", expired.toString());

      router.push("/admin");
    }
  } catch (error) {
    console.error("登入失敗:", error);
  }
};
</script>
