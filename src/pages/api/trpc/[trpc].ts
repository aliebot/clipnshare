import { createNextApiHandler } from '@trpc/server/adapters/next';
import createContext from '../../../server/context';
import { appRouter } from '../../../server/routers/app.router';

export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error('SOMETHING WENT WRONG', error);
    } else {
      console.error(error);
    }
  },
});
