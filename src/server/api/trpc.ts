import { AppError } from '@/lib/errors/Error';
import { repos } from '@/lib/repositories';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

// Base context (auth and other stuff define where you need them)
export const createTRPCContext = (opts: Record<string, unknown>) => {
  return {
    repos,
    ...opts
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
        appError: error.cause instanceof AppError ? error.cause : null
      }
    };
  }
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
