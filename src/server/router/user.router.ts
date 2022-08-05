import { prisma, Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { MESSAGES } from "constants/index";
import {
  DeleteUserInput,
  LoginInput,
  ProfileOutput,
  RegisterInput,
  UserOutput,
} from "schemas";
import { roleBaseAuth } from "utils/auth";
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
  .mutation("delete", {
    input: DeleteUserInput,
    resolve: async ({ input,ctx }) => {
      await roleBaseAuth(ctx.user, ctx.prisma, [Role.ADMIN]);
      const { id } = input;
      
      const user = await ctx.prisma.users.delete({
        where: {
          id: id,
        }
      });

      return user;
    }
  })
  .query("me", {
    output: ProfileOutput,
    resolve: async ({ ctx }) => {
      const user = await roleBaseAuth(ctx.user, ctx.prisma);
      return {
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        role: user.role,
        profile: user.profile ?? "",
      };
    },
  })
  // phase 2 : paginate data + add likes and ... data
  .query("getAll", {
    resolve: async ({ ctx }) => {
      await roleBaseAuth(ctx.user, ctx.prisma, [Role.ADMIN]);

      const users = await ctx.prisma.users.findMany({
        include: {
          _count: {
            select: {
              Likes: true
            }
          }
        },
      });
      return users;
    }
  });
