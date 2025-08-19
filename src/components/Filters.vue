<script setup>
const props = defineProps({
    filter: String,
    sortBy: String,
    searchTerm: String
})
const emits = defineEmits(['update:filter', 'update:sortBy', 'update:searchTerm'])
</script>

<template>
    <section class="max-w-[1440px] mx-auto">

        <div class="w-11/12 mx-auto mt-10">
            <div class="bg-white rounded-lg shadow p-6 mb-8">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <input type="text" placeholder="Search by Employee ID or Serial Number..."
                            class="w-full px-4 py-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            :value="searchTerm" @input="$emit('update:searchTerm', $event.target.value)" />
                    </div>

                    <div class="flex gap-4">
                        <select
                            class="px-4 py-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500"
                            :value="filter" @change="$emit('update:filter', $event.target.value)">
                            <option value="all">All Devices</option>
                            <option value="critical">Critical (&lt;10%)</option>
                            <option value="low">Low (&lt;20%)</option>
                            <option value="good">Good (&gt;50%)</option>
                        </select>

                        <select
                            class="px-4 py-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500"
                            :value="sortBy" @change="$emit('update:sortBy', $event.target.value)">
                            <option value="timestamp">Sort by Time</option>
                            <option value="batteryLevel">Sort by Battery</option>
                            <option value="employeeId">Sort by Employee</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
