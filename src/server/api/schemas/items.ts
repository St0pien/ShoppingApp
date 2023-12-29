import { z } from 'zod';

export const editItemSchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string().optional(),
  category: z.number().int().nonnegative().optional()
});
