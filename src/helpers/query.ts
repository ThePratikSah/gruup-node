import { Prisma } from "@prisma/client";
import { client, prisma } from "..";

export async function getRestaurantData(shortname: string) {
  // check for restaurant in cache first
  const getDataFromCache = await client.get(shortname);
  if (getDataFromCache) {
    return JSON.parse(getDataFromCache);
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      shortname,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const menu_items = await prisma.$queryRaw`
    SELECT 
      "MenuItem".*, 
      "Category"."name" AS "category",
      "MenuItem"."isVeg" AS "is_vegetarian",
      "RestaurantMenuItem"."price" AS "price",
      "RestaurantMenuItem"."sellingPrice" AS "sellingprice",
      "RestaurantMenuItem"."isAvailable" AS "available",
      "RestaurantMenuItem"."id" AS "menuitemid"
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
      "RestaurantMenuItem"."restaurantId" = ${restaurant.id};
  `;

  const dataToReturn = {
    ...restaurant,
    menu_items,
  };

  await client.set(shortname, JSON.stringify(dataToReturn), { EX: 5 * 60 }); // 5 minutes ttl

  return [dataToReturn];
}

export async function createRestaurant({
  name,
  address,
  phone,
  shortname,
  logo,
}: Prisma.RestaurantCreateInput) {
  return await prisma.restaurant.create({
    data: {
      name,
      address,
      phone,
      shortname,
      logo,
    },
  });
}

export async function createCategory(name: string) {
  return await prisma.category.create({
    data: {
      name,
    },
  });
}

export async function getCategories() {
  return await prisma.category.findMany();
}

export async function createMenuItem({
  name,
  image,
  description,
  category,
  isVeg,
}: Prisma.MenuItemCreateInput) {
  return await prisma.menuItem.create({
    data: {
      name,
      image,
      description,
      category,
      isVeg,
    },
  });
}
