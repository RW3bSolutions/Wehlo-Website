// composables/useFilter.js
import { computed } from "vue";

// Function to get the value from a nested property
function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export function useFilter(items, searchQuery, filterKeys) {
    const filteredItems = computed(() => {
        return items.value.filter((item) =>
            filterKeys.some((key) => {
                // Handle filtering for arrays like order_details
                if (key === "order_details.product.product_name") {
                    // Iterate over the order_details array and check if any product name matches the search query
                    return item.order_details.some((orderDetail) => {
                        const productName = orderDetail.product?.product_name || "";
                        return productName.toLowerCase().includes(searchQuery.value.toLowerCase());
                    });
                }

                // For other fields, get the value and perform the filter
                const value = getNestedValue(item, key);
                return value && value.toString().toLowerCase().includes(searchQuery.value.toLowerCase());
            })
        );
    });

    return { filteredItems };
}
