import { z } from "zod";

export const searchParamsSchema = z.object({
  search: z.string(),
  offset: z.string().optional(),
});
