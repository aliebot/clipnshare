import { createRouter } from '../createRouter';
import { z } from 'zod';
import { clipRouter } from './clip.router';

export const appRouter = createRouter()
  .query('healthz', {
    async resolve() {
      return 'OK ✅';
    },
  })
  /**
   * Merge `clipRouter` under `clip.`
   */
  .merge('clip.', clipRouter);

export type AppRouter = typeof appRouter;
