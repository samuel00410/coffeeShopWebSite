<template>
  <section class="map-section relative px-6 py-20">
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

      <StoreMapView :stores="stores" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { MapPinIcon } from "@heroicons/vue/24/outline";
import StoreMapView from "../../../components/client/mapView/StoreMapView.vue";
import { stores } from "../../../data/stores";
</script>

<style lang="scss" scoped></style>
