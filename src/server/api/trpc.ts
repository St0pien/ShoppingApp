import { repos } from '@/lib/repositories';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

// Base context (auth and other stuff define where you need them)
export const createTRPCContext = (opts: Record<string, unknown>) => {
  return {
    repos,
    ...opts
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
