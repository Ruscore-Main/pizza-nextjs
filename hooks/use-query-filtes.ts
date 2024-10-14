import React from "react";
import { Filters } from "./use-filters";
import qs from "qs";
import { useRouter } from 'next/navigation';

export const useQueryFilters = (filters: Filters) => {
    const router = useRouter();

    // Генерация строки ссылки
    React.useEffect(() => {
        const params = {
            ingredients: Array.from(filters.selectedIngredients),
            priceFrom: filters.priceFrom,
            priceTo: filters.priceTo,
            sizes: Array.from(filters.sizes),
            doughTypes: Array.from(filters.doughTypes),
        }

        const query = qs.stringify(params, {
            arrayFormat: 'comma'
        });

        router.push(`?${query}`, {
            scroll: false
        });
    }, [filters, router]);
}
