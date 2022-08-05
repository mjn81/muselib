import { Role } from "@prisma/client";
import {
  CreateGenreInput,
  CreateGenreOutput,
  GetGenreByIdInput,
  GetGenreOutput,
  UpdateGenreInput,
} from "schemas";
import { roleBaseAuth } from "utils/auth";
import { createRouter } from "./context";

export const genreRouter = createRouter()
  .mutation("create", {
    input: CreateGenreInput,
    output: CreateGenreOutput,
    resolve: async ({ input, ctx }) => {
      await roleBaseAuth(ctx.user, ctx.prisma, [
        Role.ADMIN,
      ]);
      const { name } = input;
      const genre = await ctx.prisma.genres.create({
        data: {
          name,
        },
      });
      return genre;
    },
  })
  .mutation("update", {
    input: UpdateGenreInput,
    output: CreateGenreOutput,
    resolve: async ({ input, ctx }) => {
      await roleBaseAuth(ctx.user, ctx.prisma, [
        Role.ADMIN,
      ]);
      const { id, name } = input;
      const genre = await ctx.prisma.genres.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      return genre;
    },
  }).mutation("delete", {
    input: GetGenreByIdInput,
    output: CreateGenreOutput,
    resolve: async ({ input, ctx }) => {
      await roleBaseAuth(ctx.user, ctx.prisma, [
        Role.ADMIN,
      ]);
      const { id } = input;
      const genre = await ctx.prisma.genres.delete({
        where: {
          id,
        },
      });
      return genre;
    }
  })
  .query("getAll", {
    output: GetGenreOutput,
    resolve: async ({ ctx }) => {
      const genres = await ctx.prisma.genres.findMany();
      return genres;
    },
  })
  .query("getById", {
    input: GetGenreByIdInput,
    resolve: async ({ input, ctx }) => {
      const { id } = input;
      const genre = await ctx.prisma.genres.findUnique({
        where: {
          id: id,
        },
      });
      return genre;
    },
  });
