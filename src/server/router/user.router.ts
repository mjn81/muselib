import { TRPCError } from "@trpc/server";

import { MESSAGES, ROLES } from "constants/index";
import { LoginInputUser, RegisterInputSchema, UserOutputSchema } from "schemas";
import { getEnv } from "utils/env";
import { encrypt, verify } from "utils/hash";
import { sign } from "utils/jwt";
import { createRouter } from "./context";

export const userRouter = createRouter()
  .mutation("login", {
    input: LoginInputUser,
    output: UserOutputSchema,
    resolve: async ({ input, ctx }) => {
      const { email, pasword } = input;

      const user = await ctx.prisma.users.findUnique({
        where: {
          email,
        },
      });
      if (!user)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: MESSAGES["USER_NOT_FOUND"],
        });

      const isValid = verify(pasword, user.password);

      if (!isValid)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: MESSAGES["USER_WRONG_PASSWORD"],
        });

      const token = sign(
        { email: user.email, id: user.id },
        getEnv("JWT_SECRET"),
        getEnv("JWT_EXPIRATION")
      );

      return {
        userName: user.userName,
        token: token,
      };
    },
  })
  .mutation("register", {
    input: RegisterInputSchema,
    output: UserOutputSchema,
    resolve: async ({ input, ctx }) => {
      const { fullName, userName, email, password } = input;

      const user = await ctx.prisma.users.findUnique({
        where: {
          email,
        },
      });
      if (user)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: MESSAGES["USER_ALREADY_EXISTS"],
        });

      const hashedPassword = await encrypt(password);

      const newUser = await ctx.prisma.users.create({
        data: {
          fullName,
          userName,
          email,
          password: hashedPassword,
          role: ROLES[0],
        },
      });

      const token = sign(
        { email: newUser.email, id: newUser.id },
        getEnv("JWT_SECRET"),
        getEnv("JWT_EXPIRATION")
      );

      return {
        userName: newUser.userName,
        token: token,
      };
    },
  });
