<template>
  <div class="hidden 2xl:block">
    <div class="side left"></div>
    <div class="side right"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.side {
  position: absolute;
  top: 0;
  width: 120px;
  height: 100%;
  pointer-events: none;
  opacity: 0.35;
  z-index: 0;

  background-image: url("../../assets/images/SideDecor/b_illust_119_3L 1.png");
  background-repeat: space;
  background-size: 120px auto;
}

.left {
  left: 20px;
  transform: rotate(-180deg);
}

.right {
  right: 20px;
}
</style>
