import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding the database...");
  // dropping all collections
  await prisma.$transaction([
    prisma.category.deleteMany(),
    prisma.menuItem.deleteMany(),
    prisma.restaurant.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Create Users
  await prisma.user.create({
    data: {
      email: "user1@example.com",
      name: "User One",
    },
  });

  await prisma.user.create({
    data: {
      email: "user2@example.com",
      name: "User Two",
    },
  });

  // Create Restaurants
  const r1 = await prisma.restaurant.create({
    data: {
      name: "Tandoori Treats",
      logo: "https://example.com/logo1.png",
      address: "123 Curry Lane, Spice City",
      phone: "123-456-7890",
      shortname: "tandoori-treats",
    },
  });

  const r2 = await prisma.restaurant.create({
    data: {
      name: "Masala Palace",
      logo: "https://example.com/logo2.png",
      address: "456 Saffron Street, Flavor Town",
      phone: "987-654-3210",
      shortname: "masala-palace",
    },
  });

  // Create Categories
  const category1 = await prisma.category.create({
    data: {
      name: "Starters",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Main Course",
    },
  });

  const category3 = await prisma.category.create({
    data: {
      name: "Desserts",
    },
  });

  // Create Menu Items
  const menuItem1 = await prisma.menuItem.create({
    data: {
      name: "Paneer Tikka",
      image: "https://example.com/paneer-tikka.jpg",
      categoryId: category1.id,
      description: "Delicious grilled paneer marinated with spices.",
      isVeg: true,
    },
  });

  const menuItem2 = await prisma.menuItem.create({
    data: {
      name: "Chicken Tandoori",
      image: "https://example.com/chicken-tandoori.jpg",
      categoryId: category1.id,
      description: "Spicy and juicy tandoori chicken.",
      isVeg: false,
    },
  });

  const menuItem3 = await prisma.menuItem.create({
    data: {
      name: "Butter Chicken",
      image: "https://example.com/butter-chicken.jpg",
      categoryId: category2.id,
      description: "Rich and creamy butter chicken curry.",
      isVeg: false,
    },
  });

  const menuItem4 = await prisma.menuItem.create({
    data: {
      name: "Veg Biryani",
      image: "https://example.com/veg-biryani.jpg",
      categoryId: category2.id,
      description: "Aromatic rice cooked with mixed vegetables and spices.",
      isVeg: true,
    },
  });

  const menuItem5 = await prisma.menuItem.create({
    data: {
      name: "Gulab Jamun",
      image: "https://example.com/gulab-jamun.jpg",
      categoryId: category3.id,
      description: "Soft milk dumplings soaked in sugar syrup.",
      isVeg: true,
    },
  });

  const menuItem6 = await prisma.menuItem.create({
    data: {
      name: "Rasgulla",
      image: "https://example.com/rasgulla.jpg",
      categoryId: category3.id,
      description: "Spongy cottage cheese balls in sugar syrup.",
      isVeg: true,
    },
  });

  // Create RestaurantMenuItem
  await prisma.restaurantMenuItem.createMany({
    data: [
      {
        restaurantId: r1.id,
        price: 10,
        menuItemId: menuItem1.id,
        isAvailable: true,
      },
      {
        restaurantId: r1.id,
        price: 10,
        menuItemId: menuItem2.id,
        isAvailable: true,
      },
      {
        restaurantId: r1.id,
        price: 10,
        menuItemId: menuItem3.id,
        isAvailable: true,
      },
      {
        restaurantId: r1.id,
        price: 10,
        menuItemId: menuItem4.id,
        isAvailable: true,
      },
      {
        restaurantId: r1.id,
        price: 10,
        menuItemId: menuItem5.id,
        isAvailable: true,
      },
      {
        restaurantId: r1.id,
        price: 10,
        menuItemId: menuItem6.id,
        isAvailable: true,
      },
      {
        restaurantId: r2.id,
        price: 10,
        menuItemId: menuItem3.id,
        isAvailable: true,
      },
      {
        restaurantId: r2.id,
        price: 10,
        menuItemId: menuItem4.id,
        isAvailable: true,
      },
      {
        restaurantId: r2.id,
        price: 10,
        menuItemId: menuItem6.id,
        isAvailable: true,
      },
    ],
  });

  console.log("Seeding 🌱 completed!");
}

main()
  .catch((e) => {
    console.error("Error seeding the database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
