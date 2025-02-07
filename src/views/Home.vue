<script setup>
import { ref, onMounted } from 'vue'
import mj1 from '@/assets/images/mj1.png'
import ScanTimeline from '@/components/ScanTimeline.vue'
import DnsRecordsTable from '@/components/DNSRecords.vue'

const scanData = ref(null)
const dnsRecords = ref([])
const searchQuery = ref('')

const headers = ref([
  { title: 'Type', key: 'type' },
  { title: 'Host', key: 'host' },
  { title: 'Resolved IPs', key: 'resolved_hosts' },
  { title: 'Scope', key: 'scope_description' },
])

onMounted(async () => {
  try {
    const response = await fetch('/cleaned_bbot.json')
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    scanData.value = data.scanData || {}
    dnsRecords.value = data.dnsRecords.map((record) => ({
      ...record,
      resolved_hosts: record.resolved_hosts.join(', '),
    }))
  } catch (error) {
    console.error('Error loading data:', error)
  }
})
</script>

<template>
  <v-container>
    <v-card class="mb-4 custom-border">
      <v-row no-gutters>
        <!-- Image Column -->
        <v-col cols="4">
          <v-img :src="mj1" :width="300" aspect-ratio="4/3" cover />
        </v-col>

        <v-col cols="8" v-if="scanData" class="position-relative">
          <v-card-title class="text-orange d-flex justify-space-between align-center">
            Scan Overview
            <ScanTimeline :dnsRecords="dnsRecords" />
          </v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item v-if="scanData.id"
                ><strong class="text-orange">ID:</strong> {{ scanData.id }}</v-list-item
              >
              <v-list-item v-if="scanData.name">
                <stron class="text-orange">Name:</stron> {{ scanData.name }}
              </v-list-item>
              <v-list-item v-if="scanData.target && scanData.target.seeds.length">
                <strong class="text-orange">Target:</strong> {{ scanData.target.seeds[0] }}
              </v-list-item>
              <v-list-item v-if="scanData.status">
                <strong class="text-orange">Status:</strong>
                <v-chip
                  class="ml-2"
                  :color="scanData.status === 'RUNNING' ? 'neon-green' : 'red'"
                  dark
                >
                  {{ scanData.status }}
                </v-chip>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>

    <DnsRecordsTable
      :dnsRecords="dnsRecords"
      :headers="headers"
      v-model:searchQuery="searchQuery"
    />
  </v-container>
</template>

<style scoped>
.custom-border {
  border: 1px solid rgba(128, 128, 128, 0.15); /* Medium grey border */
  border-radius: 8px; /* Optional: Rounded corners */
}
</style>
