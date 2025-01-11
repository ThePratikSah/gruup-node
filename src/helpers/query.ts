import { prisma } from "..";

export async function getRestaurantData(shortname: string) {
  // get restaurant data based on shortname
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      shortname,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  // get menu items for the restaurant
  const menu_items = await prisma.$queryRaw`
    SELECT 
      "MenuItem".*, 
      "Category"."name" AS "category",
      "MenuItem"."isVeg" AS "is_vegetarian",
      "RestaurantMenuItem"."price" AS "price",
      "RestaurantMenuItem"."sellingPrice" AS "sellingprice"
    FROM 
      "MenuItem"
    INNER JOIN 
      "RestaurantMenuItem" 
    ON 
      "RestaurantMenuItem"."menuItemId" = "MenuItem"."id"
    INNER JOIN 
      "Category" 
    ON 
      "Category"."id" = "MenuItem"."categoryId"
    WHERE 
      "RestaurantMenuItem"."restaurantId" = ${restaurant.id}
    AND "RestaurantMenuItem"."isAvailable" = true;
  `;

  const dataToReturn = {
    ...restaurant,
    menu_items,
  };

  return [dataToReturn];
}

export async function createRestaurant() {
  return await prisma.restaurant.create({
    data: {
      name: "Pratik Ji Ka Dhaba",
      address: "Banglore, Karnataka",
      phone: "8708708708",
      shortname: "pratik-ji-ka-dhaba",
    },
  });
}

export async function createCategory(name: string) {
  await prisma.category.create({
    data: {
      name,
    },
  });
}

export async function createMenuItem(
  name: string,
  image: string,
  price: number,
  category: any,
  description: string,
  isVeg: boolean
) {}