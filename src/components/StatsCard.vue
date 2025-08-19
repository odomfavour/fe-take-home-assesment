<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center">
      <!-- Render the passed-in icon component -->
      <component :is="icon" class="w-8 h-8 mr-3" :class="color" />
      <div>
        <p class="text-sm font-medium text-gray-600">{{ title }}</p>
        <p class="text-2xl font-bold text-gray-900">{{ value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType, Component } from 'vue'

defineProps({
  icon: {
  type: [Object, Function] as PropType<any>,
  required: false
},
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number] as PropType<string | number>,
    required: true,
    default: 0
  },
  color: {
    type: String,
    default: ''
  }
})
</script>
