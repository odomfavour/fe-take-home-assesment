<template>
    <section class="max-w-[1440px] mx-auto" data-test="battery-table">

        <div class="w-11/12 mx-auto mt-10">
            <div class="bg-white rounded-lg shadow">
                <div class="p-6 border-b border-gray-200">
                    <h2 class="text-xl font-semibold text-gray-900">Battery Readings History</h2>
                    <p class="text-sm text-gray-600 mt-1">
                        Showing {{ filteredData.length }} of {{ total }} readings
                    </p>
                </div>

                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200 table-auto">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Battery
                                    Level</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="(reading, index) in filteredData"
                                :key="`${reading.serialNumber}-${reading.timestamp}-${index}`"
                                :data-battery="reading.batteryLevel" class="hover:bg-gray-50 text-sm text-gray-900"
                                data-test="device-row">

                                <!-- Device -->
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-2">
                                        <Smartphone class="w-5 h-5 text-gray-400" />
                                        <p>{{ reading.serialNumber }}</p>
                                    </div>
                                </td>

                                <!-- Employee -->
                                <td class="px-6 py-4 whitespace-nowrap  items-center gap-2">
                                    <div class="flex items-center gap-2">

                                        <User class="w-4 h-4 text-gray-400" />
                                        <p>{{ reading.employeeId }}</p>
                                    </div>
                                </td>

                                <!-- Battery Level -->
                                <td class="px-6 py-4 whitespace-nowrap  items-center gap-2">
                                    <div class="flex items-center gap-2">

                                        <Battery class="w-5 h-5"
                                            :class="getBatteryStatus(reading.batteryLevel).color" />
                                        <p>{{ (reading.batteryLevel * 100).toFixed(1) }}%</p>
                                    </div>
                                </td>

                                <!-- Status -->
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center gap-2">
                                        <span class="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                            :class="[getBatteryStatus(reading.batteryLevel).bg, getBatteryStatus(reading.batteryLevel).color]">
                                            <AlertTriangle
                                                v-if="getBatteryStatus(reading.batteryLevel).status === 'critical'"
                                                class="w-3 h-3 mr-1" />
                                            <TrendingDown
                                                v-else-if="getBatteryStatus(reading.batteryLevel).status === 'low'"
                                                class="w-3 h-3 mr-1" />
                                            <TrendingUp v-else class="w-3 h-3 mr-1" />
                                            {{ getBatteryStatus(reading.batteryLevel).status }}
                                        </span>
                                    </div>
                                </td>

                                <!-- Timestamp -->
                                <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                                    {{ formatTimestamp(reading.timestamp) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Smartphone, User, Battery, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-vue-next';
import { getBatteryStatus, formatTimestamp } from '@/utils/battery';

interface Reading {
    serialNumber: string
    employeeId: string
    batteryLevel: number
    timestamp: string
}

defineProps<{
    filteredData: Reading[]
    total: number
}>();
</script>
