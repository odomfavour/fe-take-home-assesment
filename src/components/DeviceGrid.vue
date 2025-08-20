<template>
    <section class="max-w-[1440px] mx-auto" data-test="device-grid">
        <div class="w-11/12 mx-auto mt-10">
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-2">Battery Readings</h2>
                <p class="text-sm text-gray-600 mb-4">
                    Showing {{ filteredData.length }} of {{ total }} readings
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="(reading, index) in filteredData" :key="`${reading.serialNumber}-${index}`"
                        class="bg-white rounded-xl border border-gray-200 shadow-md transition cursor-pointer"
                        data-test="device-row" :data-battery="reading.batteryLevel">
                        <div class="p-6">

                            <div class="flex items-center justify-between mb-4">
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-900">
                                        {{ reading.serialNumber }}
                                    </h3>
                                    <p class="text-sm text-gray-500">Employee: {{ reading.employeeId }}</p>
                                </div>
                                <div class="text-sm font-medium px-2 py-1 rounded text-black"
                                    :class="getBatteryStatus(reading.batteryLevel).bg">
                                    {{ (reading.batteryLevel * 100).toFixed(1) }}%
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                    :class="[getBatteryStatus(reading.batteryLevel).bg, getBatteryStatus(reading.batteryLevel).color]">
                                    <AlertTriangle v-if="getBatteryStatus(reading.batteryLevel).status === 'critical'"
                                        class="w-3 h-3 mr-1" />
                                    <TrendingDown v-else-if="getBatteryStatus(reading.batteryLevel).status === 'low'"
                                        class="w-3 h-3 mr-1" />
                                    <TrendingUp v-else class="w-3 h-3 mr-1" />
                                    {{ getBatteryStatus(reading.batteryLevel).status }}
                                </span>
                            </div>
                            <div class="text-gray-500 text-sm mt-2">
                                {{ formatTimestamp(reading.timestamp) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-vue-next';
import { formatTimestamp, getBatteryStatus } from '@/utils/battery';
import type { DeviceData } from '@/types/device-data';


defineProps<{
    filteredData: DeviceData[];
    total: number;
}>();

</script>
