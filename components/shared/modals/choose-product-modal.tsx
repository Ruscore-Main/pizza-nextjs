'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Dialog } from '@/components/ui';
import { DialogContent } from '@/components/ui/dialog';
import { Title } from '../title';
import { Product } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { ChoosePizzaForm } from '../choose-pizza-form';

interface Props {
    product: Product;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();
    return (
        <Dialog open={!!product} onOpenChange={() => router.back()}>
            <DialogContent className={
                cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                    className)}>
                <ChoosePizzaForm />
            </DialogContent>
        </Dialog>
    );
};