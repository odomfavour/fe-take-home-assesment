<template>
    <div class="bg-white shadow-sm border-b">
        <div class="max-w-[1440px] mx-auto py-6">

            <div class="w-11/12 mx-auto">
                <div class="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900">Battery Monitoring Dashboard</h1>
                        <p class="text-gray-600 mt-1">Field Support for Batteries</p>
                    </div>
                    <div class="flex items-center gap-1 rounded-md p-1 bg-white">
                        <button @click="setViewMode('grid')" :class="[
                            'flex items-center gap-1 px-3 py-1.5 cursor-pointer rounded-md text-sm font-medium transition',
                            viewMode === 'grid'
                                ? 'bg-gray-100 text-black'
                                : 'text-gray-600 hover:bg-gray-50',
                        ]">
                            <LayoutGrid class="h-4 w-4" />
                            Grid
                        </button>

                        <button data-test="toggle-table" @click="setViewMode('table')" :class="[
                            'flex items-center gap-1 px-3 py-1.5 cursor-pointer rounded-md text-sm font-medium transition',
                            viewMode === 'table'
                                ? 'bg-gray-100 text-black'
                                : 'text-gray-600 hover:bg-gray-50',
                        ]">
                            <List class="h-4 w-4" />
                            Table
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LayoutGrid, List } from 'lucide-vue-next';

const { viewMode } = defineProps<{
    viewMode: 'grid' | 'table';
}>();

const emit = defineEmits<{
    (e: 'update:viewMode', mode: 'grid' | 'table'): void;
}>();

const setViewMode = (mode: 'grid' | 'table') => {
    emit('update:viewMode', mode);
};
</script>
