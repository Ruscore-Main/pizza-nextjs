import React from 'react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { Button } from '../ui';

// interface Props {
//     imageUrl: string;
//     name: string;
//     ingredients: any;
//     items: any;
//     loading?: boolean;
//     onSubmit: (itemId: number, ingredients: number[]) => void;
//     className?: string;
// }

interface Props {
    imageUrl: string;
    name: string;
    loading?: boolean;
    onSubmit?: VoidFunction;
    className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
    name,
    imageUrl,
    loading,
    onSubmit,
    className
}) => {
    const textDetails = "30 см, традиционное тесто 30";
    const totalPrice = 350;
    console.log(name)
    return (
        <div className={cn(className, 'flex flex-1')}>
            <div className="flex items-center justify-center flex-1 relative w-full">
                <img
                    src={imageUrl}
                    alt={name}
                    className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
                />
            </div>

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title className='font-extrabold md-1' size='md' text={name} />

                <p className="text-gray-400">{textDetails}</p>

                <Button
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};