<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, computed } from "vue";

const props = defineProps<{
    totalItems: number;
    rowsPerPage: number;
    currentPage: number;
}>();

const emit = defineEmits<{
    (e: "update:currentPage", page: number): void;
    (e: "update:rowsPerPage", rows: number): void;
}>();

const localRowsPerPage = ref(props.rowsPerPage);
const localCurrentPage = ref(props.currentPage);

watch(() => props.rowsPerPage, val => localRowsPerPage.value = val);
watch(() => props.currentPage, val => localCurrentPage.value = val);

const totalPages = computed(() => Math.ceil(props.totalItems / localRowsPerPage.value));

function changePage(page: number) {
    if (page < 1 || page > totalPages.value) return;
    localCurrentPage.value = page;
    emit("update:currentPage", page);
}

function changeRowsPerPage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = Number(target.value);
    localRowsPerPage.value = value;
    emit("update:rowsPerPage", value);
    changePage(1); // reset to first page
}

// Compute pages to show like React version
const pageNumbers = computed<(number | string)[]>(() => {
    const pages: (number | string)[] = [];

    if (totalPages.value <= 7) {
        for (let i = 1; i <= totalPages.value; i++) pages.push(i);
    } else {
        pages.push(1);

        if (localCurrentPage.value > 3) pages.push("...");

        const start = Math.max(2, localCurrentPage.value - 1);
        const end = Math.min(totalPages.value - 1, localCurrentPage.value + 1);

        for (let i = start; i <= end; i++) pages.push(i);

        if (localCurrentPage.value < totalPages.value - 2) pages.push("...");

        pages.push(totalPages.value);
    }

    return pages;
});
</script>

<template>
    <section class="max-w-[1440px] mx-auto">

        <div class="w-11/12 mx-auto mt-10">
            <div class="flex justify-between items-center flex-wrap gap-4 p-2">
                <!-- Rows per page -->
                <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-700">Showing</span>
                    <select class="border border-gray-300 rounded px-2 py-1 text-sm bg-white text-black"
                        :value="localRowsPerPage" @change="changeRowsPerPage">
                        <option v-for="value in [5, 10, 15, 20, 25, 30]" :key="value" :value="value">{{ value }}
                        </option>
                    </select>
                    <span class="text-sm text-gray-700">out of {{ props.totalItems }}</span>
                </div>

                <!-- Pagination buttons -->
                <div class="flex items-center gap-1 flex-wrap">
                    <!-- Prev -->
                    <button class="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100"
                        :disabled="localCurrentPage === 1" @click="changePage(localCurrentPage - 1)">
                        Prev
                    </button>

                    <!-- Page numbers -->
                    <template v-for="(page, index) in pageNumbers" :key="index">
                        <button v-if="typeof page === 'number'" @click="changePage(page)"
                            class="px-3 py-1 rounded text-sm border" :class="page === localCurrentPage
                                ? 'bg-primary text-white cursor-default'
                                : 'text-gray-700 hover:bg-gray-100'">
                            {{ page }}
                        </button>
                        <span v-else class="px-2 text-gray-500">...</span>
                    </template>

                    <!-- Next -->
                    <button class="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100"
                        :disabled="localCurrentPage === totalPages" @click="changePage(localCurrentPage + 1)">
                        Next
                    </button>
                </div>

            </div>
        </div>
    </section>

</template>
