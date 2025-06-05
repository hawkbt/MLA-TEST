import { z } from "zod";

export const searchParamsSchema = z.object({
  q: z.string(),
  offset: z.string().optional(),
});
