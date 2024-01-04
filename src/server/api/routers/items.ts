import { editItemSchema } from '../schemas/items';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const itemsRouter = createTRPCRouter({
  editItem: publicProcedure
    .input(editItemSchema)
    .mutation(async ({ ctx, input: { id, category, name } }) => {
      await ctx.repos.items.update(id, {
        category,
        name
      });
    })
});
