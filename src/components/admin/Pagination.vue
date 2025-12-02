<template>
  <div class="flex justify-center mt-6">
    <div class="join">
      <button
        class="join-item btn"
        :class="{ 'btn-disabled': !pages.has_pre }"
        @click="$emit('page-changed', pages.current_page - 1)"
        :disabled="!pages.has_pre"
      >
        «
      </button>
      <button
        v-for="page in pages.total_pages"
        :key="page"
        class="join-item btn"
        :class="{ 'btn-active': page === pages.current_page }"
        @click="$emit('page-changed', page)"
      >
        {{ page }}
      </button>
      <button
        class="join-item btn"
        :class="{ 'btn-disabled': !pages.has_next }"
        @click="$emit('page-changed', pages.current_page + 1)"
        :disabled="!pages.has_next"
      >
        »
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import type { Tpagination } from "../../types/product";

const props = defineProps<{
  pages: Tpagination;
}>();

const emit = defineEmits<{
  (e: "page-changed", page: number): void;
}>();
</script>
