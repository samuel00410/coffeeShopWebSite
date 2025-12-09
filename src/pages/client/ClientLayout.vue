<template>
  <div class="min-h-screen bg-hero-bottom flex flex-col">
    <ClientNavbar />

    <main class="flex-1">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import ClientNavbar from "../../components/ClientNavbar.vue";
import Footer from "../../components/client/Footer.vue";
</script>
