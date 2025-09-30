// composables/usePagination.js
import { computed, ref } from "vue";

export function usePagination(items, perPageDefault = 10) {
    const currentPage = ref(1);
    const perPage = ref(perPageDefault);

    const totalPages = computed(() => Math.ceil(items.value.length / perPage.value));

    const paginatedItems = computed(() => {
        const start = (currentPage.value - 1) * perPage.value;
        return items.value.slice(start, start + perPage.value);
    });

    return { currentPage, perPage, totalPages, paginatedItems };
}
