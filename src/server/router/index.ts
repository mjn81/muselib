// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { userRouter } from './user.router';
import { genreRouter } from './genre.router';
import { singerRouter } from './singer.router';
import { musicRouter } from './music.router';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('user.', userRouter)
  .merge('genre.', genreRouter)
  .merge('singer.', singerRouter)
  .merge('music.', musicRouter);
export type AppRouter = typeof appRouter;
