'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Dialog } from '@/shared/components/ui';
import { DialogContent } from '@/shared/components/ui/dialog';
import { Product } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '..';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();

    const isPizzaForm = Boolean(product.productOptions[0].pizzaType);

    return (
        <Dialog open={!!product} onOpenChange={() => router.back()}>
            <DialogContent className={
                cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                    className)}>
                {isPizzaForm ?
                    <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={[]} />
                    : <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
                }
            </DialogContent>
        </Dialog>
    );
};