<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  dnsRecords: Array,
  headers: Array,
  searchQuery: String,
})

const emit = defineEmits(['update:searchQuery'])
const selectedRecord = ref(null)
const isPanelOpen = ref(false)

const filteredDnsRecords = computed(() => {
  if (!props.searchQuery) return props.dnsRecords
  return props.dnsRecords.filter((record) =>
    Object.values(record).some((value) =>
      String(value).toLowerCase().includes(props.searchQuery.toLowerCase()),
    ),
  )
})

// Ensure we correctly capture row data and toggle the panel
const openDetails = (record) => {
  if (record) {
    selectedRecord.value = record
    isPanelOpen.value = true
  }
}

const closeDetails = () => {
  isPanelOpen.value = false
  selectedRecord.value = null
}

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const formattedKeys = computed(() => {
  return (key) => capitalizeFirstLetter(key)
})
</script>

<template>
  <v-card>
    <v-card-title class="d-flex align-center pe-2">
      <span class="text-orange mt-n9">
        <v-icon icon="mdi-network-outline"></v-icon> &nbsp; DNS Records
      </span>

      <v-spacer></v-spacer>
      <v-text-field
        :model-value="searchQuery"
        label="Search DNS Records"
        class="mb-4"
        outlined
        clearable
        @update:model-value="emit('update:searchQuery', $event)"
      />
    </v-card-title>

    <v-data-table
      :items="filteredDnsRecords"
      :headers="headers"
      :loading="loading"
      item-value="key"
      hover
      @click:row="(_, { item }) => openDetails(item)"
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template v-slot:item.resolved_hosts="{ item }">
        <span>
          {{ item.resolved_hosts.split(',').slice(0, 2).join(', ') }}
          <span v-if="item.resolved_hosts.split(',').length > 2">...</span>
        </span>
      </template>
    </v-data-table>

    <!-- Right Side Expansion Panel -->
    <v-navigation-drawer v-model="isPanelOpen" location="right" width="400" temporary>
      <v-card v-if="selectedRecord">
        <v-card-title class="d-flex align-center text-orange">
          DNS Record Details
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" class="text-orange" @click="closeDetails"></v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-list dense>
            <v-list-item v-for="(value, key) in selectedRecord" :key="key">
              <v-list-item-title class="font-weight-bold text-orange">
                {{ formattedKeys(key) }}:
              </v-list-item-title>
              <v-list-item-subtitle>
                <template v-if="key === 'resolved_hosts'">
                  <!-- Ensure each IP appears on a new line -->
                  <v-row v-for="(ip, index) in value.split(',')" :key="index">
                    <v-col cols="12">{{ ip.trim() }}</v-col>
                  </v-row>
                </template>
                <template v-else>
                  {{ value }}
                </template>
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
  </v-card>
</template>
