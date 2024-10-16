import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
    imageUrl: string;
    name: string;
    ingredients: any;
    items: any;
    loading?: boolean;
    onSubmit: (itemId: number, ingredients: number[]) => void;
    className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn(className)}></div>
    );
};