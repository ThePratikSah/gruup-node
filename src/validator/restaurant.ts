import { z } from "zod";

export const restaurantSchema = z.object({
  shortname: z.string(),
});
