import { Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { MESSAGES } from "constants/index";
import {
  LoginInput,
  ProfileOutput,
  RegisterInput,
  UserOutput,
} from "schemas";
import { getEnv } from "utils/env";
import { encrypt, verify } from "utils/hash";
import { sign } from "utils/jwt";
import { createRouter } from "./context";

export const userRouter = createRouter()
  .mutation("login", {
    input: LoginInput,
    output: UserOutput,
    resolve: async ({ input, ctx }) => {
      const { email, password } = input;

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

      const isValid = await verify(password, user.password);

      if (!isValid) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: MESSAGES["USER_WRONG_PASSWORD"],
        });
      }

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
    input: RegisterInput,
    output: UserOutput,
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
          role: Role.CLIENT,
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
  })
  .query("me", {
    output: ProfileOutput,
    resolve: async ({ ctx }) => {
      const payload = ctx.user;
      if (!payload)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: MESSAGES["USER_NOT_AUTHENTICATED"],
        });

      const user = await ctx.prisma.users.findUnique({
        where: {
          id: payload.id,
        },
      });
      if (!user)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: MESSAGES["USER_NOT_FOUND"],
        });
      return {
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        role: user.role,
        profile: user.profile ?? "",
      };
    },
  });
