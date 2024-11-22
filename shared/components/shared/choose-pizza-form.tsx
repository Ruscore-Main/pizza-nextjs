import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';
import { GroupVariants } from './group-variants';
import { pizzaSizes } from '@/shared/constants/pizza';

interface Props {
    imageUrl: string;
    name: string;
    ingredients: any[];
    items?: any[];
    loading?: boolean;
    onSubmit?: VoidFunction;
    className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
    name,
    items,
    imageUrl,
    ingredients,
    loading,
    onSubmit,
    className
}) => {
    const textDetails = "30 см, традиционное тесто 30";
    const totalPrice = 350;
    console.log(name)
    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage imageUrl={imageUrl} size={30} />

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title className='font-extrabold md-1' size='md' text={name} />

                <p className="text-gray-400">{textDetails}</p>

                <GroupVariants items={pizzaSizes} />

                <Button
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};