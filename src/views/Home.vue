<template>
  <div class="home bg-secondary min-h-screen">
    <Header v-model:viewMode="viewMode" />
    <section class="max-w-[1440px] mx-auto">

      <div class="w-11/12 mx-auto mt-10">
        <p>Welcome Admin</p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard :icon="Smartphone" title="Total Devices" :value="analytics?.totalDevices" color="text-blue-600" />
          <StatsCard :icon="BatteryFull" title="High" :value="analytics?.highBatteryCount" color="text-green-600" />
          <StatsCard :icon="BatteryLow" title="Low Battery" :value="analytics?.lowBatteryCount"
            color="text-orange-600" />
          <StatsCard :icon="AlertTriangle" title="Critical" :value="analytics?.criticalBatteryCount"
            color="text-red-600" />
        </div>
      </div>
    </section>
    <Filters v-model:filter="filter" v-model:sortBy="sortBy" v-model:searchTerm="searchTerm" />
    <div v-if="paginatedData.length === 0" class="text-center py-12">
      <Smartphone class="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <p class="text-gray-500 text-lg">No devices match your search</p>
    </div>
    <DeviceGrid v-else-if="viewMode === 'grid'" :filteredData="paginatedData" :total="data.length" />
    <BatteryTable v-else :filteredData="paginatedData" :total="data.length" />
    <Pagination :total-items="filteredData.length" :rows-per-page="rowsPerPage" :current-page="currentPage"
      @update:currentPage="currentPage = $event" @update:rowsPerPage="rowsPerPage = $event" />
    <!-- <h1>Home</h1>
    <p>Welcome to your Vue.js app!</p> -->
  </div>
</template>
<script setup lang="ts">
import Header from "@/components/Header.vue";
import StatsCard from "@/components/StatsCard.vue";
import BatteryTable from "@/components/BatteryTable.vue";
import Filters from "@/components/Filters.vue";
import DeviceGrid from "@/components/DeviceGrid.vue";
import Pagination from "@/components/Pagination.vue";
import { Smartphone, Battery, AlertTriangle, BatteryFull, BatteryLow } from 'lucide-vue-next'
import deviceData from '@/data/battery.json'
import { ref, computed, onMounted } from "vue";
import type { DeviceData } from "@/types/device-data";

const data = ref<DeviceData[]>([])
const filter = ref('all')
const sortBy = ref('timestamp')
const searchTerm = ref('')
const currentPage = ref(1);
const rowsPerPage = ref(10);


onMounted(() => {
  data.value = deviceData
})

const analytics = computed(() => {
  if (!data.value.length) return null
  console.log('data', data.value)

  const criticalBatteryDevices = data.value.filter(d => d.batteryLevel <= 0.1)
  const lowBatteryDevices = data.value.filter(d => d.batteryLevel > 0.1 && d.batteryLevel <= 0.5)
  const highBatteryDevices = data.value.filter(d => d.batteryLevel > 0.5)

  const avg =
    data.value.reduce((s, d) => s + d.batteryLevel, 0) / data.value.length

  const latestReadings = Object.values(
    data.value.reduce<Record<string, DeviceData>>((acc, r) => {
      if (
        !acc[r.serialNumber] ||
        new Date(r.timestamp) > new Date(acc[r.serialNumber].timestamp)
      ) {
        acc[r.serialNumber] = r
      }
      return acc
    }, {})
  )

  return {
    totalDevices: data.value.length,
    criticalBatteryCount: criticalBatteryDevices.length,
    lowBatteryCount: lowBatteryDevices.length,
    highBatteryCount: highBatteryDevices.length,
    averageBattery: avg,
    latestReadings,
  }
})

const filteredData = computed(() => {
  let filtered = [...data.value]

  if (filter.value === 'low') {
    filtered = filtered.filter(d => d.batteryLevel <= 0.2)
  } else if (filter.value === 'critical') {
    filtered = filtered.filter(d => d.batteryLevel <= 0.1)
  } else if (filter.value === 'good') {
    filtered = filtered.filter(d => d.batteryLevel > 0.5)
  }

  if (searchTerm.value) {
    filtered = filtered.filter(d =>
      d.employeeId.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      d.serialNumber.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  filtered.sort((a, b) => {
    if (sortBy.value === 'batteryLevel') return a.batteryLevel - b.batteryLevel
    if (sortBy.value === 'employeeId') return a.employeeId.localeCompare(b.employeeId)
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })

  return filtered
})


const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  return filteredData.value.slice(start, start + rowsPerPage.value);
});


const viewMode = ref<"grid" | "table">("grid");
</script>
