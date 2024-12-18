import React from 'react';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { Container, PizzaImage, Title } from '@/shared/components/shared';
import { GroupVariants } from '@/shared/components/shared/group-variants';

interface Props {
    params: { id: string }
}

const Page: React.FC<Props> = async ({ params: { id } }) => {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            productOptions: true
        }
    });

    if (!product) {
        return notFound();
    }

    return <Container className="flex flex-col my-10">
        <div className="flex flex-1">
            <PizzaImage imageUrl={product.imageUrl} size={30} />

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={product.name} size="md" className="font-extrabold mb-1" />

                <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, saepe.</p>
                <GroupVariants value='1' items={[
                    {
                        name: "Маленькая",
                        value: "1"
                    },
                    {
                        name: "Средняя",
                        value: "2"
                    },
                    {
                        name: "Большая",
                        value: "3",
                        disabled: true
                    },
                ]} />
            </div>
        </div>
    </Container>
};

export default Page;