import { Container, Filters, ProductCard, ProductsGroupList, Title, TopBar } from '@/components/shared';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />

      <Container className="pb-14 mt-10">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList title="Пиццы" categoryId={1} items={[
                {
                  id: 1,
                  name: 'Пицца 1',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D6175C10773BFE36E56D48DF7E3.avif',
                  items: [
                    {
                      id: 1,
                      price: 500
                    }
                  ]
                },
                {
                  id: 2,
                  name: 'Пицца 2',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D6175C10773BFE36E56D48DF7E3.avif',
                  items: [
                    {
                      id: 1,
                      price: 500
                    }
                  ]
                },
                {
                  id: 3,
                  name: 'Пицца 3',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D6175C10773BFE36E56D48DF7E3.avif',
                  items: [
                    {
                      id: 1,
                      price: 500
                    }
                  ]
                },
                {
                  id: 4,
                  name: 'Пицца 3',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D6175C10773BFE36E56D48DF7E3.avif',
                  items: [
                    {
                      id: 1,
                      price: 500
                    }
                  ]
                },
                {
                  id: 5,
                  name: 'Пицца 3',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D6175C10773BFE36E56D48DF7E3.avif',
                  items: [
                    {
                      id: 1,
                      price: 500
                    }
                  ]
                },
                {
                  id: 6,
                  name: 'Пицца 3',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D6175C10773BFE36E56D48DF7E3.avif',
                  items: [
                    {
                      id: 1,
                      price: 500
                    }
                  ]
                },
                {
                  id: 7,
                  name: 'Пицца 3',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D6175C10773BFE36E56D48DF7E3.avif',
                  items: [
                    {
                      id: 1,
                      price: 500
                    }
                  ]
                },
              ]} />
              <ProductsGroupList title="Комбо" categoryId={2} items={[
                {
                  id: 8,
                  name: 'Пицца 1',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D6175C10773BFE36E56D48DF7E3.avif',
                  items: [
                    {
                      id: 1,
                      price: 500
                    }
                  ]
                },
                {
                  id: 9,
                  name: 'Пицца 2',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D6175C10773BFE36E56D48DF7E3.avif',
                  items: [
                    {
                      id: 1,
                      price: 500
                    }
                  ]
                },
                {
                  id: 10,
                  name: 'Пицца 3',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D6175C10773BFE36E56D48DF7E3.avif',
                  items: [
                    {
                      id: 1,
                      price: 500
                    }
                  ]
                },
                {
                  id: 11,
                  name: 'Пицца 3',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D6175C10773BFE36E56D48DF7E3.avif',
                  items: [
                    {
                      id: 1,
                      price: 500
                    }
                  ]
                },
                {
                  id: 12,
                  name: 'Пицца 3',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D6175C10773BFE36E56D48DF7E3.avif',
                  items: [
                    {
                      id: 1,
                      price: 500
                    }
                  ]
                },
                {
                  id: 13,
                  name: 'Пицца 3',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D6175C10773BFE36E56D48DF7E3.avif',
                  items: [
                    {
                      id: 1,
                      price: 500
                    }
                  ]
                },
                {
                  id: 14,
                  name: 'Пицца 3',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D6175C10773BFE36E56D48DF7E3.avif',
                  items: [
                    {
                      id: 1,
                      price: 500
                    }
                  ]
                },
              ]} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
