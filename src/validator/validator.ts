import { z } from "zod";

export const restaurantSchema = z.object({
  shortname: z.string(),
});

export const categorySchema = z.object({
  name: z.string({
    required_error: "Category name is required",
  }),
});

export const menuItemSchema = z.object({
  name: z.string({
    required_error: "Menu item name is required",
  }),
  image: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.number({
    required_error: "Category ID is required",
  }),
  isVeg: z.boolean().optional(),
});

export const addNewRestaurantSchema = z.object({
  logo: z.string().optional(),
  name: z.string({
    required_error: "Restaurant name is required",
  }),
  phone: z.string({
    required_error: "Phone number is required",
  }),
  address: z.string({
    required_error: "Address is required",
  }),
  shortname: z.string({
    required_error: "Short name is required",
  }),
});

export const addNewUserSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z.string({
    required_error: "Email is required",
  }),
  password: z.string().optional(),
});
