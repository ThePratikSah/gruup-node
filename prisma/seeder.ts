import {
  PrismaClient,
  User,
  Restaurant,
  Category,
  MenuItem,
} from "@prisma/client";

const prisma = new PrismaClient();

// Generic helper function with TypeScript generics
async function safeCreate<T>(
  fn: () => Promise<T>,
  dataType: string
): Promise<T | null> {
  try {
    return await fn();
  } catch (error: any) {
    console.error(`Error creating ${dataType}:`, error.message || error);
    return null; // Return null to avoid breaking further operations
  }
}

async function main() {
  console.log("Seeding the database...");

  // Create Users
  const user1: User | null = await safeCreate(
    () =>
      prisma.user.create({
        data: {
          email: "user1@example.com",
          name: "User One",
        },
      }),
    "User One"
  );

  const user2: User | null = await safeCreate(
    () =>
      prisma.user.create({
        data: {
          email: "user2@example.com",
          name: "User Two",
        },
      }),
    "User Two"
  );

  // Create Restaurants
  const r1: Restaurant | null = await safeCreate(
    () =>
      prisma.restaurant.create({
        data: {
          name: "Tandoori Treats",
          logo: "https://example.com/logo1.png",
          address: "123 Curry Lane, Spice City",
          phone: "123-456-7890",
          shortname: "tandoori-treats",
        },
      }),
    "Tandoori Treats Restaurant"
  );

  const r2: Restaurant | null = await safeCreate(
    () =>
      prisma.restaurant.create({
        data: {
          name: "Masala Palace",
          logo: "https://example.com/logo2.png",
          address: "456 Saffron Street, Flavor Town",
          phone: "987-654-3210",
          shortname: "masala-palace",
        },
      }),
    "Masala Palace Restaurant"
  );

  // Create Categories
  const category1: Category | null = await safeCreate(
    () =>
      prisma.category.create({
        data: {
          name: "Starters",
        },
      }),
    "Starters Category"
  );

  const category2: Category | null = await safeCreate(
    () =>
      prisma.category.create({
        data: {
          name: "Main Course",
        },
      }),
    "Main Course Category"
  );

  const category3: Category | null = await safeCreate(
    () =>
      prisma.category.create({
        data: {
          name: "Desserts",
        },
      }),
    "Desserts Category"
  );

  // Create Menu Items
  const menuItems: Array<MenuItem | null> = [];
  const items = [
    {
      name: "Paneer Tikka",
      image: "https://example.com/paneer-tikka.jpg",
      categoryId: category1?.id,
      description: "Delicious grilled paneer marinated with spices.",
      isVeg: true,
    },
    {
      name: "Chicken Tandoori",
      image: "https://example.com/chicken-tandoori.jpg",
      categoryId: category1?.id,
      description: "Spicy and juicy tandoori chicken.",
      isVeg: false,
    },
    {
      name: "Butter Chicken",
      image: "https://example.com/butter-chicken.jpg",
      categoryId: category2?.id,
      description: "Rich and creamy butter chicken curry.",
      isVeg: false,
    },
    {
      name: "Veg Biryani",
      image: "https://example.com/veg-biryani.jpg",
      categoryId: category2?.id,
      description: "Aromatic rice cooked with mixed vegetables and spices.",
      isVeg: true,
    },
    {
      name: "Gulab Jamun",
      image: "https://example.com/gulab-jamun.jpg",
      categoryId: category3?.id,
      description: "Soft milk dumplings soaked in sugar syrup.",
      isVeg: true,
    },
    {
      name: "Rasgulla",
      image: "https://example.com/rasgulla.jpg",
      categoryId: category3?.id,
      description: "Spongy cottage cheese balls in sugar syrup.",
      isVeg: true,
    },
  ];

  for (const item of items) {
    const createdItem: MenuItem | null = await safeCreate(
      () =>
        prisma.menuItem.create({
          data: item,
        }),
      item.name
    );
    menuItems.push(createdItem);
  }

  // Create RestaurantMenuItem
  if (r1 && r2) {
    await safeCreate(
      () =>
        prisma.restaurantMenuItem.createMany({
          data: menuItems
            .filter((item): item is MenuItem => item !== null) // Ensure no null values
            .flatMap((item) => [
              {
                restaurantId: r1.id,
                price: 10,
                menuItemId: item.id,
                isAvailable: true,
              },
              {
                restaurantId: r2.id,
                price: 10,
                menuItemId: item.id,
                isAvailable: true,
              },
            ]),
        }),
      "Restaurant Menu Items"
    );
  }

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
