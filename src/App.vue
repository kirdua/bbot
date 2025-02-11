<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view v-slot="{ Component }">
        <component :is="Component"></component>
      </router-view>
    </v-main>
  </v-app>
</template>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0s lienar;
  opacity: 0;
}
</style>
