import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";

export const useIngredients = () => {
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

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
            finally {
                setIsLoading(false);
            }
        }

        getIngredients();
    }, [])

    return { ingredients, isLoading };
};