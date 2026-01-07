<template>
  <section class="map-section px-6 py-20">
    <div class="container mx-auto">
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center gap-4 bg-white rounded-full px-8 py-4 shadow-[0_6px_0_0_#E8DBC8] mb-10 border-4 border-[#4A3D2F] transform -rotate-1"
        >
          <MapPinIcon class="h-6 w-6 text-[#FFD4B0]" />
          <span className="text-lg font-black text-[#4A3D2F]">交通資訊</span>
        </div>
        <h2 className="text-[#4A3D2F] transform rotate-1">如何前往 🗺️</h2>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.6989754994487!2d121.56313!3d25.03303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDAxJzU4LjkiTiAxMjHCsDMzJzQ3LjMiRQ!5e0!3m2!1szh-TW!2stw!4v1234567890"
        width="100%"
        height="400"
        style="border: 0"
        loading="lazy"
      >
      </iframe>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MapPinIcon } from "@heroicons/vue/24/outline";
</script>
