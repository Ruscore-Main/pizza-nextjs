"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import { Category } from '@prisma/client';

interface Props {
    items: Category[];
    className?: string;
}

const activeIndex = 0;

export const Categories: React.FC<Props> = ({ items, className }) => {
    const activeCategoryId = useCategoryStore((state) => state.activeId);
    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
            {
                items.map((cat) => (
                    <a className={cn(
                        "flex items-center font-semibold h-11 rounded-2xl px-5",
                        activeCategoryId === cat.id && "bg-white shadow-md shadow-gray-200 text-primary"
                    )}
                        href={`#${cat.name}`}
                        key={cat.id}>
                        <button>
                            {cat.name}
                        </button>
                    </a>
                ))
            }
        </div>
    );
};