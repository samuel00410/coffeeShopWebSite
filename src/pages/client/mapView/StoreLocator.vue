<template>
  <section class="map-section relative px-6 py-20">
    <div class="container mx-auto">
      <div
        class="text-center mb-16"
        v-animate-on-scroll="{
          effect: 'fade-right',
          duration: 750,
          delay: 200,
        }"
      >
        <div
          class="inline-flex items-center gap-4 bg-white rounded-full px-8 py-4 shadow-[0_6px_0_0_#E8DBC8] mb-10 border-4 border-[#4A3D2F] transform -rotate-1"
        >
          <MapPinIcon class="h-6 w-6 text-[#FFD4B0]" />
          <span className="text-lg font-black text-[#4A3D2F]">交通資訊</span>
        </div>
        <h2 className="text-[#4A3D2F] transform rotate-1">如何前往 🗺️</h2>
      </div>

      <div class="flex flex-col lg:flex-row gap-6">
        <div class="flex-1" v-animate-on-scroll="'fade-up'">
          <StoreMapView ref="mapRef" :stores="stores" />
        </div>
        <div
          class="flex flex-row lg:flex-col gap-4 lg:w-[280px]"
          v-animate-on-scroll="{
            effect: 'fade-left',
            duration: 800,
            delay: 200,
          }"
        >
          <StoreCard
            v-for="store in stores"
            :key="store.id"
            :store="store"
            @select="onSelectStore"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Store } from "../../../types/stores";
import { ref } from "vue";
import { MapPinIcon } from "@heroicons/vue/24/outline";
import StoreMapView from "../../../components/client/mapView/StoreMapView.vue";
import StoreCard from "../../../components/client/StoreCard.vue";
import { stores } from "../../../data/stores";

const mapRef = ref<InstanceType<typeof StoreMapView> | null>(null);

function onSelectStore(store: Store) {
  mapRef.value?.panTo(store);
}
</script>

<style lang="scss" scoped></style>
