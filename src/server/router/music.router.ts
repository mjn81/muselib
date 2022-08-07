import { Role } from "@prisma/client";
import { CreateMusicInput } from "schemas";
import { roleBaseAuth } from "utils/auth";
import { createRouter } from "./context";

export const musicRouter = createRouter()
  .mutation("create", {
    
    input: CreateMusicInput,
    resolve: async ({ input,ctx}) => {
      const { title, year, singers, musicLink, genres} = input;
      const user = await roleBaseAuth(ctx.user, ctx.prisma, [Role.ADMIN]);
      const music = await ctx.prisma.musics.create({
        data: {
          title:title,
          year:year,
          musicLink:musicLink,
          GenreItem: {
            createMany: {
              data: genres.map(({ id }) => ({
                genresId:id,
              })),
            },
          },
          SingerItem: {
            createMany: {
              data: singers.map(({id}) => ({
                singersId:id,
              })),
            },
          },
          userId: {
            connect: {
              id: user.id,
            }
          }
        },
      });
      return music;
    }
  })
  .query("getAll", {
    resolve:async ({ctx}) => {
      await roleBaseAuth(ctx.user, ctx.prisma, [Role.ADMIN]);
      const musics = await ctx.prisma.musics.findMany({
        select: {
          id: true,
          title: true,
          year: true,
          musicLink: true,
          userId: {
            select: {
              userName: true,
            }
          },
          SingerItem: {
            select: {
              singer: {
                select: {
                  name: true,
                }
              }
            }
          },
          GenreItem: {
            select: {
              genreId: {
                select: {
                  name: true,
                }
              }
            }
          },
          _count: {
            select: {
              Likes: true,
            }
          }
          
        }
      });
      
      return musics;
    }
  });