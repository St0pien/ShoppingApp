import { editItemSchema, withIdSchema } from '../schemas/items';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const itemsRouter = createTRPCRouter({
  editItem: publicProcedure
    .input(editItemSchema.merge(withIdSchema))
    .mutation(async ({ ctx, input: { id, category, name } }) => {
      await ctx.repos.items.update(id, {
        category,
        name
      });
    })
});
