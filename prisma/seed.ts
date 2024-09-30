import { Prisma } from "@prisma/client";
import { categories, _ingredients, products } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductOption = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price:
      size == 20
        ? randomDecimalNumber(190, 400)
        : size == 30
        ? randomDecimalNumber(400, 650)
        : randomDecimalNumber(650, 900),
    pizzaType,
    size,
  } as Prisma.ProductOptionUncheckedCreateInput;
};

async function up() {
  // Создание юзеров
  await prisma.user.createMany({
    data: [
      {
        fullName: "User Test",
        email: "user@test.ru",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin Test",
        email: "admin@test.ru",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  // Создание категорий
  await prisma.category.createMany({
    data: categories,
  });

  // Создание ингредиентов
  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  // Создание продуктов
  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Пепперони фреш",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Сырная",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Чоризо фреш",
      imageUrl:
        "https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 40),
      },
    },
  });

  // Добавление параметров каждой пиццы
  await prisma.productOption.createMany({
    data: [
      // Пицца "Пепперони фреш"
      generateProductOption({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductOption({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductOption({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      // Пицца "Сырная"
      generateProductOption({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductOption({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductOption({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductOption({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductOption({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductOption({ productId: pizza2.id, pizzaType: 2, size: 40 }),

      // Пицца "Чоризо фреш"
      generateProductOption({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductOption({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductOption({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      // Остальные продукты
      generateProductOption({ productId: 1 }),
      generateProductOption({ productId: 2 }),
      generateProductOption({ productId: 3 }),
      generateProductOption({ productId: 4 }),
      generateProductOption({ productId: 5 }),
      generateProductOption({ productId: 6 }),
      generateProductOption({ productId: 7 }),
      generateProductOption({ productId: 8 }),
      generateProductOption({ productId: 9 }),
      generateProductOption({ productId: 10 }),
      generateProductOption({ productId: 11 }),
      generateProductOption({ productId: 12 }),
      generateProductOption({ productId: 13 }),
      generateProductOption({ productId: 14 }),
      generateProductOption({ productId: 15 }),
      generateProductOption({ productId: 16 }),
      generateProductOption({ productId: 17 }),
    ],
  });

  // Создание корзины
  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalPrice: 0,
        token: "111111",
      },
      {
        userId: 2,
        totalPrice: 0,
        token: "22222",
      },
    ],
  });

  // Создание товаров для корзины
  await prisma.cartItem.create({
    data: {
      cartId: 1,
      productOptionId: 1,
      amount: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductOption" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
