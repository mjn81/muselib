import { TRPCError } from "@trpc/server";

export const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Environment variable ${key} is not defined`,
    });
  }
  return value;
};
