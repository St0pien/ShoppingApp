import { createTRPCRouter, publicProcedure } from '../trpc';

export const itemsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.repos.items.fetchAll();
  })
});
