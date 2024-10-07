import { Ingredient } from "@prisma/client";
import React from 'react';
import { Api } from '@/services/api-client';
import { useSet } from "react-use";


interface ReturnProps {
    ingredients: Ingredient[];
    isLoading: boolean;
    selectedIds: Set<string>;
    onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [selectedIds, { toggle }] = useSet(new Set<string>([]));

    React.useEffect(() => {
        async function getIngredients() {
            try {
                const data = await Api.ingredients.getAll();
                setIngredients(data);
                setIsLoading(false);
            }
            catch (error) {
                console.log(error);
            }
        }

        getIngredients();
    }, [])

    return { ingredients, isLoading, selectedIds, onAddId: toggle };
}