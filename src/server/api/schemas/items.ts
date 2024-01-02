import { z } from 'zod';

export const withIdSchema = z.object({
  id: z.number().int().nonnegative()
});

export const editItemSchema = z.object({
  name: z.string().min(1).optional(),
  category: z.number().int().nonnegative().nullish()
});
