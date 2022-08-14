// src/server/router/context.ts
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

import { prisma } from 'server/db/client';
import { getEnv } from 'utils/env';
import { getPayload } from 'utils/jwt';

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  const req = opts?.req;
  const res = opts?.res;
  const token = req?.headers.authorization;
  if (!token)
    return {
      req,
      res,
      prisma,
      user: undefined,
    };
  const token_data = token.split(' ')[1];
  if (!token_data) {
    return {
      req,
      res,
      prisma,
      user: undefined,
    };
  }
  const payload = getPayload(
    token_data,
    getEnv('JWT_SECRET')
  );
  if (!payload) {
    return {
      req,
      res,
      prisma,
      user: undefined,
    };
  }
  return {
    req,
    res,
    prisma,
    user: payload,
  };
};

type Context = trpc.inferAsyncReturnType<
  typeof createContext
>;

export const createRouter = () => trpc.router<Context>();
