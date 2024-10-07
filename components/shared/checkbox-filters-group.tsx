'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { FilterChecboxProps as FilterCheckboxProps, FilterCheckbox } from './filter-checkbox';
import { Input, Skeleton } from '../ui';

type Item = FilterCheckboxProps;

interface Props {
  title?: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  isLoading: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  selectedIds: Set<string>;
  className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = 'Поиск...',
  onClickCheckbox,
  isLoading = true,
  defaultValue,
  selectedIds,
  className,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  if (isLoading) {
    return <div className={cn(className)}>
      <p className="font-bold mb-3">Ингридиенты:</p>
      {Array(limit).fill(0).map((_, index) => (
        <Skeleton key={index} className="h-6 mb-4 rounded-[8px] bg-gray-200" />
      ))}
      <Skeleton className="w-28 h-6 mb-4 rounded-[8px] bg-gray-200" />
    </div>
  }

  const onChangeSeachValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) : defaultItems.slice(0, limit);

  return (
    <div className={cn(className)}>
      <p className="font-bold mb-3">Ингридиенты:</p>

      {showAll && (
        <div className="mb-5">
          <Input placeholder={searchInputPlaceholder} value={searchValue} onChange={onChangeSeachValue} className="bg-gray-50 border-none"></Input>
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selectedIds.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button className="text-primary mt-3" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  );
};
