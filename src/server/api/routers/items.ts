import {
  addItemSchema,
  deleteItemSchema,
  editItemSchema
} from '../schemas/items';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const itemsRouter = createTRPCRouter({
  editItem: publicProcedure
    .input(editItemSchema)
    .mutation(async ({ ctx, input: { id, category, name } }) => {
      await ctx.repos.items.update(id, {
        category,
        name
      });
    }),

  additem: publicProcedure
    .input(addItemSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.repos.items.add(input);
    }),
  deleteItem: publicProcedure
    .input(deleteItemSchema)
    .mutation(async ({ ctx, input: id }) => {
      await ctx.repos.items.delete(id);
    })
});
