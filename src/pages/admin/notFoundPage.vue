<template>
  <div>
    <h1 class="text-4xl font-bold text-center mt-20">404 - 頁面不存在</h1>
    <p class="text-center mt-4">抱歉，您所尋找的頁面不存在或已被移除。</p>
    <div class="text-center mt-6">
      <router-link :to="{ name: 'Products' }" class="btn btn-primary">
        返回首頁
      </router-link>
    </div>
  </div>
</template>
