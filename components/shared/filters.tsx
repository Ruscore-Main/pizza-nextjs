"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';
import { RangeSlider } from '../ui/range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, isLoading, onAddId, selectedIds } = useFilterIngredients();
  const [{ priceFrom, priceTo }, setPrice] = React.useState<PriceProps>({ priceFrom: 0, priceTo: 5000 });
  const items = ingredients.map((item) => ({ text: item.name, value: String(item.id) }))

  const onChangePrice = (values: number[]) => {
    values[1] = values[1] > 5000 ? 5000 : values[1];
    values[0] = values[0] > values[1] ? values[1] : values[0];

    setPrice({ priceFrom: values[0], priceTo: values[1] });
  }

  return (
    <div className={cn(className)}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Чекбоксы фильтров */}
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>

      {/* Слайдер цены */}
      <div className="mt-5 border-y border-y-neutral-100 pt-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={5000} value={priceFrom} onChange={(e) => onChangePrice([+e.target.value, priceTo])} />
          <Input type="number" placeholder="5000" min={100} max={5000} value={priceTo} onChange={(e) => onChangePrice([priceFrom, +e.target.value])} />
        </div>

        <RangeSlider min={0} max={5000} step={10} value={[priceFrom, priceTo]} onValueChange={onChangePrice} />
      </div>

      <CheckboxFiltersGroup
        title="Ингридиенты:"
        className="mt-5"
        defaultItems={items.slice(0, 5)}
        isLoading={isLoading}
        items={items}
        onClickCheckbox={onAddId}
        selectedIds={selectedIds}
      />
    </div>
  );
};
