import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useSet } from 'react-use';

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    doughTypes: string;
    sizes: string;
    ingredients: string;
}

export interface Filters {
    sizes: Set<string>;
    doughTypes: Set<string>;
    selectedIngredients: Set<string>;
    priceFrom: number | undefined;
    priceTo: number | undefined;
}

interface ReturnProps extends Filters {
    setPrices: (values: number[]) => void;
    toggleSelectedIngredients: (id: string) => void;
    toggleSizes: (id: string) => void;
    toggleDoughType: (id: string) => void;
}


export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    // Фильтр ингредиентов
    const [selectedIngredients, { toggle: toggleSelectedIngredients }] = useSet<string>(new Set(searchParams.get("ingredients")?.split(",")));


    // Фильтр цены
    const [{ priceFrom, priceTo }, setPrice] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get("priceFrom")) || undefined,
        priceTo: Number(searchParams.get("priceTo")) || undefined,
    });


    // Фильтр размеров
    const [sizes, { toggle: toggleSizes }] = useSet<string>(new Set(searchParams.get("sizes")?.split(",")));

    // Фильтр типа теста
    const [doughTypes, { toggle: toggleDoughType }] = useSet<string>(new Set(searchParams.get("doughTypes")?.split(",")));

    // Обработчик изменения цены
    const updatePrice = (values: number[]) => {
        values[1] = values[1] > 5000 ? 5000 : values[1];
        values[0] = values[0] > values[1] ? values[1] : values[0];

        setPrice({ priceFrom: values[0], priceTo: values[1] });
    }

    return {
        priceFrom,
        priceTo,
        sizes,
        doughTypes,
        selectedIngredients,
        setPrices: updatePrice,
        toggleSizes,
        toggleDoughType,
        toggleSelectedIngredients
    }
}