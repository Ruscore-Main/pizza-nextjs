import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
    params: { id: string }
}

const Page: React.FC<Props> = ({ params: { id } }) => {
    return (
        <div>
            <h1>Product {id}</h1>
        </div>
    );
};

export default Page;