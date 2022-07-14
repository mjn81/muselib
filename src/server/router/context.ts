// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { MESSAGES } from "constants/index";

import { prisma } from "server/db/client";
import { getEnv } from "utils/env";
import { getPayload } from "utils/jwt";

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
  const token_data = token.split(" ")[1];
  if (!token_data)
    throw new trpc.TRPCError({
      code: "BAD_REQUEST",
      message: MESSAGES["INVALID_TOKEN"],
    });

  const payload = getPayload(token_data, getEnv("JWT_SECRET"));
  if (!payload)
    throw new trpc.TRPCError({
      code: "BAD_REQUEST",
      message: MESSAGES["INVALID_TOKEN"],
    });

  return {
    req,
    res,
    prisma,
    user: payload,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
