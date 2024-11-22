import { Container, Filters, ProductsGroupList, Title, TopBar } from '@/shared/components/shared';
import { prisma } from '@/prisma/prisma-client';

export default async function Home() {

  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          productOptions: true,
          ingredients: true
        }
      }
    }
  });

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categories={categories.filter(category => category.products.length > 0)} />

      <Container className="pb-14 mt-10">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {
                categories.map(categorie => (
                  categorie.products.length > 0 &&
                  <ProductsGroupList
                    key={categorie.id}
                    title={categorie.name}
                    categoryId={categorie.id}
                    items={categorie.products}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
