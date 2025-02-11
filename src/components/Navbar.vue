<script setup>
import { ref, onMounted } from 'vue'
import navbarRoutes from '../utils/navbar_routes'
import mj1 from '@/assets/images/mj1.png'

const items = navbarRoutes
const drawer = ref(true)
const rail = ref(true)

// Set the first route as active by default
const activeItem = ref(items.length > 0 ? items[0].route : '')

const setActiveItem = (route) => {
  activeItem.value = route
}

// Ensure the first item is active on component mount
onMounted(() => {
  if (!activeItem.value && items.length > 0) {
    activeItem.value = items[0].route
  }
})
</script>

<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      color="black"
      @click="rail = false"
    >
      <v-list>
        <v-list-item :prepend-avatar="mj1" subtitle="sandra_a88@gmail.com" title="Sandra Adams">
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              class="text-orange"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          :class="{ 'selected-item': activeItem === item.route }"
          @click="setActiveItem(item.route)"
        >
          <template v-slot:prepend>
            <v-icon :color="activeItem === item.route ? 'orange' : 'white'">
              {{ item.icon }}
            </v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<style scoped>
.selected-item {
  background-color: orange !important;
  color: black !important;
  font-weight: bold;
  border-radius: 8px;
}
</style>
