import { z } from 'zod';

/**
 * @SHARED
 */
const id = z.number().int().nonnegative();
const itemName = z.string().min(1);
const itemCategoryId = id.nullable();
/**
 * @SERVER
 */
export const editItemSchema = z.object({
  id,
  name: itemName.optional(),
  category: itemCategoryId.optional()
});

export const addItemSchema = z.object({
  name: itemName,
  category: itemCategoryId
});

export const deleteItemSchema = id;

/**
 * @CLIENT
 */
export const editItemForm = z.object({
  name: itemName.optional(),
  category: z
    .object({
      id: itemCategoryId,
      name: z.string()
    })
    .optional()
});

export const addItemForm = z.object({
  name: itemName,
  category: z.object({
    id: itemCategoryId,
    name: z.string()
  })
});
