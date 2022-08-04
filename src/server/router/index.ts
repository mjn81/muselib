// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { userRouter } from "./user.router";
import { genreRouter } from "./genre.router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("user.", userRouter)
  .merge("genre.", genreRouter);
export type AppRouter = typeof appRouter;
