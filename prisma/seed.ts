import { hashSync } from "bcrypt";
import { Prisma } from "@prisma/client";
import prisma from "./prisma-client";
import { CATEGORIES, INGREDIENTS, PRODUCTS } from "./constants";

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductVariant = ({
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
    price: randomNumber(190, 600),
    pizzaType,
    size,
  } as Prisma.ProductVariantUncheckedCreateInput;
};

async function up() {
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
        fullName: "Admin Admin",
        email: "admin@test.ru",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: CATEGORIES,
  });

  await prisma.ingredient.createMany({
    data: INGREDIENTS,
  });

  await prisma.product.createMany({
    data: PRODUCTS,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Пепперони фреш",
      imageUrl: "/assets/images/pizza1.webp",
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Сырная",
      imageUrl: "/assets/images/pizza2.webp",
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Чоризо фреш",
      imageUrl: "/assets/images/pizza3.webp",
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(10, 40),
      },
    },
  });

  await prisma.productVariant.createMany({
    data: [
      generateProductVariant({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductVariant({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductVariant({ productId: pizza1.id, pizzaType: 2, size: 40 }),
      generateProductVariant({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductVariant({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductVariant({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductVariant({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductVariant({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductVariant({ productId: pizza2.id, pizzaType: 2, size: 40 }),
      generateProductVariant({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductVariant({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductVariant({ productId: pizza3.id, pizzaType: 2, size: 40 }),
      generateProductVariant({ productId: 1 }),
      generateProductVariant({ productId: 2 }),
      generateProductVariant({ productId: 3 }),
      generateProductVariant({ productId: 4 }),
      generateProductVariant({ productId: 5 }),
      generateProductVariant({ productId: 6 }),
      generateProductVariant({ productId: 7 }),
      generateProductVariant({ productId: 8 }),
      generateProductVariant({ productId: 9 }),
      generateProductVariant({ productId: 10 }),
      generateProductVariant({ productId: 11 }),
      generateProductVariant({ productId: 12 }),
      generateProductVariant({ productId: 13 }),
      generateProductVariant({ productId: 14 }),
      generateProductVariant({ productId: 15 }),
      generateProductVariant({ productId: 16 }),
      generateProductVariant({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "111111",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "222222",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productVariantId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      { previewImageUrl: "/assets/images/story1.webp" },
      { previewImageUrl: "/assets/images/story2.webp" },
      { previewImageUrl: "/assets/images/story3.webp" },
      { previewImageUrl: "/assets/images/story4.webp" },
      { previewImageUrl: "/assets/images/story5.webp" },
      { previewImageUrl: "/assets/images/story6.webp" },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl: "/assets/images/story-item1.webp",
      },
      {
        storyId: 1,
        sourceUrl: "/assets/images/story-item2.webp",
      },
      {
        storyId: 2,
        sourceUrl: "/assets/images/story-item3.webp",
      },
      {
        storyId: 3,
        sourceUrl: "/assets/images/story-item4.webp",
      },
      {
        storyId: 4,
        sourceUrl: "/assets/images/story-item5.webp",
      },
      {
        storyId: 5,
        sourceUrl: "/assets/images/story-item1.webp",
      },
      {
        storyId: 5,
        sourceUrl: "/assets/images/story-item2.webp",
      },
      {
        storyId: 6,
        sourceUrl: "/assets/images/story-item3.webp",
      },
      {
        storyId: 6,
        sourceUrl: "/assets/images/story-item4.webp",
      },
      {
        storyId: 6,
        sourceUrl: "/assets/images/story-item5.webp",
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
