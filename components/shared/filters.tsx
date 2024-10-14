"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from '../ui/range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilters, useIngredients, useQueryFilters } from '@/hooks';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {

  const { ingredients, isLoading } = useIngredients();

  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({ text: item.name, value: String(item.id) }))



  return (
    <div className={cn(className)}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Чекбоксы фильтров */}
      <CheckboxFiltersGroup
        title="Тип теста"
        className="mb-5"
        onClickCheckbox={(selectedItem) => filters.toggleDoughType(selectedItem)}
        selected={filters.doughTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        className="mb-5"
        onClickCheckbox={(selectedItem) => filters.toggleSizes(selectedItem)}
        selected={filters.sizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />

      {/* Слайдер цены */}
      <div className="mt-5 border-y border-y-neutral-100 pt-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={5000} value={filters.priceFrom} onChange={(e) => filters.setPrices([+e.target.value, filters.priceTo ?? 5000])} />
          <Input type="number" placeholder="5000" min={100} max={5000} value={filters.priceTo} onChange={(e) => filters.setPrices([filters.priceFrom ?? 0, +e.target.value])} />
        </div>

        <RangeSlider min={0} max={5000} step={10} value={[filters.priceFrom ?? 0, filters.priceTo ?? 5000]} onValueChange={filters.setPrices} />
      </div>

      <CheckboxFiltersGroup
        title="Ингридиенты:"
        className="mt-5"
        defaultItems={items.slice(0, 5)}
        isLoading={isLoading}
        items={items}
        onClickCheckbox={filters.toggleSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
