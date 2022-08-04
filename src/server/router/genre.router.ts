import { Role } from "@prisma/client";
import {
  CreateGenreInput,
  CreateGenreOutput,
  GetGenreOutput,
} from "schemas";
import { roleBaseAuth } from "utils/auth";
import { createRouter } from "./context";

export const genreRouter = createRouter()
  .mutation("createGenre", {
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
  .query("getGenres", {
    output: GetGenreOutput,
    resolve: async ({ ctx }) => {
      const genres = await ctx.prisma.genres.findMany();
      return genres;
    }
  });
