<script setup>
import { ref, nextTick } from 'vue'
import Chart from 'chart.js/auto'
import moment from 'moment'

const dialog = ref(false)
const props = defineProps({
  dnsRecords: Array,
})

const initializeChart = async () => {
  await nextTick() // Wait for DOM update
  const canvas = document.getElementById('timelineChart')

  if (!canvas) {
    console.error('Canvas element not found')
    return
  }

  const ctx = canvas.getContext('2d')
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.dnsRecords.map((record) => moment(record.timestamp).format('MM-DD-YYYY')),
      datasets: [
        {
          label: 'Record Discoveries',
          data: props.dnsRecords.map((_, index) => index + 1),
          borderColor: 'orange',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: 'grey',
          },
        },
      },
      scales: {
        x: {
          title: { display: true, text: 'Timestamp', color: 'grey' },
          ticks: { autoSkip: true, maxTicksLimit: 10, color: 'grey' },
          grid: {
            color: 'grey',
          },
        },
        y: {
          title: { display: true, text: 'Records Discovered', color: 'grey' },
          ticks: { color: 'grey' },
          grid: {
            color: 'grey',
          },
        },
      },
    },
  })
}

// Run chart initialization only when dialog opens
const onDialogOpen = () => {
  if (props.dnsRecords.length) {
    initializeChart()
  }
}
</script>

<template>
  <v-dialog v-model="dialog" @update:model-value="onDialogOpen">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="orange"
        text="View Scan Timeline"
        variant="outlined"
      ></v-btn>
    </template>

    <v-card>
      <v-card-title class="d-flex justify-space-between align-center text-orange">
        Scan Timeline
        <v-btn class="text-orange" density="comfortable" icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <canvas id="timelineChart" responsive="true"></canvas>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
