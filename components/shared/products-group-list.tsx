"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { ProductCard } from './';
import { useIntersection } from 'react-use';


interface Props {
  title: string;
  items: any[];
  categoryId: number;
  listClassName?: string;
  className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  categoryId,
  listClassName,
  className,
}) => {
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      console.log(title);
    }
  }, [intersection?.isIntersecting, title, categoryId]);
  return (
    <div className={cn(className)} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.items[0].price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};
