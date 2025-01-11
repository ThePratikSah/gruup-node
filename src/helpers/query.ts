import { prisma } from "..";

export async function getRestaurantData(shortname: string) {
  return await prisma.restaurant.findFirst({
    where: {
      shortname,
    },
    select: {
      id: true,
      name: true,
      address: true,
      phone: true,
      shortname: true,
      logo: true,
      RestaurantMenuItem: {
        where: {
          isAvailable: true,
        },
        include: {
          menuItem: true,
        },
      },
    },
  });
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
) {
  await prisma.menuItem.create({
    data: {
      name,
      image,
      price,
      category,
      description,
      isVeg,
    },
  });
}
