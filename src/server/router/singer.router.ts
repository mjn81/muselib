import { Role } from "@prisma/client";
import {
  CreateSingerInput,
  CreateSingerOutput,
  GetSingerByIdInput,
  GetSingerOutput,
} from "schemas";
import { roleBaseAuth } from "utils/auth";
import { createRouter } from "./context";

export const singerRouter = createRouter()
  .mutation("create", {
    input: CreateSingerInput,
    output: CreateSingerOutput,
    resolve: async ({ input, ctx }) => {
      await roleBaseAuth(ctx.user, ctx.prisma, [
        Role.ADMIN,
      ]);
      const { name } = input;
      const singer = await ctx.prisma.singers.create({
        data: {
          name,
        },
      });
      return singer;
    },
  })
  .mutation("update", {
    input: CreateSingerOutput,
    output: CreateSingerOutput,
    resolve: async ({ input, ctx }) => {
      await roleBaseAuth(ctx.user, ctx.prisma, [
        Role.ADMIN,
      ]);
      const { id, name } = input;
      const singer = await ctx.prisma.singers.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      
      return singer;
    },
  })
  .mutation("delete", {
    input: GetSingerByIdInput,
    output: CreateSingerOutput,
    resolve: async ({ input, ctx }) => {
      await roleBaseAuth(ctx.user, ctx.prisma, [
        Role.ADMIN,
      ]);
      const { id } = input;
      const singer = await ctx.prisma.singers.delete({
        where: {
          id,
        },
      });
      return singer;
    },
  })
  .query("getAll", {
    output: GetSingerOutput,
    resolve: async ({ ctx }) => {
      const singers = await ctx.prisma.singers.findMany();
      return singers;
    },
  })
  .query("getById", {
    input: GetSingerByIdInput,
    resolve: async ({ input, ctx }) => {
      const { id } = input;
      const singer = await ctx.prisma.singers.findUnique({
        where: {
          id: id,
        },
      });
      return singer;
    },
  });
