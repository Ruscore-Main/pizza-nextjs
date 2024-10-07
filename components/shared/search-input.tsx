"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { Api } from '@/services/api-client';
import { Product } from '@prisma/client';
import { useDebounce } from 'react-use';

interface Props {
    className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [searchText, setSearchText] = React.useState("");
    const [products, setProducts] = React.useState<Product[]>([]);
    const searchRef = React.useRef<HTMLInputElement>(null);
    const handleClickOutside = (e: MouseEvent) => {
        const path = e.composedPath && e.composedPath();

        (searchRef.current && !path.includes(searchRef.current)) && setIsFocused(false);
    }
    React.useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        () => document.removeEventListener('click', handleClickOutside);
    })

    useDebounce(async () => {
        try {
            const data = await Api.products.search(searchText);
            setProducts(data);
        } catch (e) {
            console.log(e);
        }
    }, 300, [searchText])

    const onClickItem = (product: Product) => {
        setIsFocused(false);
        setSearchText('');
        setProducts([])
    }

    return (
        <>
            {isFocused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}
            <div ref={searchRef} className={cn("flex rounded-2xl flex-1 justify-between relative h-11 z-30", className)} >
                <Search className="absolute top-[50%] translate-y-[-50%] left-3 h-5 text-gray-400" />
                <input
                    className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Найти товар..."
                    onFocus={() => setIsFocused(true)}
                />


                {products.length > 0 && <div className={cn(
                    "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
                    isFocused && "visible opacity-100 top-12"
                )}>
                    {
                        products.map(el => <Link
                            onClick={() => onClickItem(el)}
                            key={el.id}
                            className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                            href={`/product/${el.id}`}>
                            <img src={el.imageUrl} className="rounded-sm h-8 w-8" alt={el.name} />
                            <span>{el.name}</span>
                        </Link>
                        )
                    }

                </div>
                }
            </div>

        </>
    );
};