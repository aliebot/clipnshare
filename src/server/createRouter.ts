import { router } from '@trpc/server';
import superjson from 'superjson';
import { Context } from './context';

export function createRouter() {
  return router<Context>().transformer(superjson);
}
