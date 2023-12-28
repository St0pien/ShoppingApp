import { itemsRouter } from './routers/items';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  items: itemsRouter
});

export type AppRouter = typeof appRouter;
