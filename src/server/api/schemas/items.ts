import { z } from 'zod';

export const editItemSchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string().min(1).optional(),
  category: z.number().int().nonnegative().nullish()
});

export const editItemForm = z.object({
  name: z.string().min(1).optional(),
  category: z
    .object({
      id: z.number().int().nonnegative().nullable(),
      name: z.string()
    })
    .optional()
});
