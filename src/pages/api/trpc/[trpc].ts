// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from 'server/router';
import { createContext } from 'server/router/context';

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  onError: ({ error }) => {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error('Internal server error:', error);
    } else {
      console.error('Error:', error);
      return error;
    }
  },
});
