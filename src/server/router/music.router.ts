import { Role } from '@prisma/client';
import { resolve } from 'path';
import {
  CreateMusicInput,
  DeleteMusicInput,
  UpdateMusicInput,
} from 'schemas';
import { roleBaseAuth } from 'utils/auth';
import { createRouter } from './context';

export const musicRouter = createRouter()
  .mutation('create', {
    input: CreateMusicInput,
    resolve: async ({ input, ctx }) => {
      const { title, year, singers, musicLink, genres } =
        input;
      const user = await roleBaseAuth(
        ctx.user,
        ctx.prisma,
        [Role.ADMIN]
      );
      const music = await ctx.prisma.musics.create({
        data: {
          title: title,
          year: year,
          musicLink: musicLink,
          GenreItem: {
            createMany: {
              data: genres.map(({ id }) => ({
                genresId: id,
              })),
            },
          },
          SingerItem: {
            createMany: {
              data: singers.map(({ id }) => ({
                singersId: id,
              })),
            },
          },
          userId: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      return music;
    },
  })
  .mutation('update', {
    input: UpdateMusicInput,
    resolve: async ({ input, ctx }) => {
      await roleBaseAuth(ctx.user, ctx.prisma, [
        Role.ADMIN,
      ]);
      const {
        id,
        title,
        year,
        musicLink,
        genres,
        singers,
      } = input;
      const delGenres =
        await ctx.prisma.genreItem.deleteMany({
          where: {
            musicId: {
              id: id,
            },
          },
        });
      const delSingers =
        await ctx.prisma.singerItem.deleteMany({
          where: {
            musicId: {
              id: id,
            },
          },
        });

      const music = await ctx.prisma.musics.update({
        where: {
          id: id,
        },
        data: {
          title: title,
          year: year,
          musicLink: musicLink,
          GenreItem: {
            createMany: {
              data: genres.map(({ id }) => ({
                genresId: id,
              })),
            },
          },
          SingerItem: {
            createMany: {
              data: singers.map(({ id }) => ({
                singersId: id,
              })),
            },
          },
        },
      });
      return music;
    },
  })
  .mutation('delete', {
    input: DeleteMusicInput,
    resolve: async ({ input, ctx }) => {
      const { id } = input;
      await roleBaseAuth(ctx.user, ctx.prisma, [
        Role.ADMIN,
      ]);
      const music = await ctx.prisma.musics.delete({
        where: {
          id: id,
        },
      });
      return music;
    },
  })
  .query('getAll', {
    resolve: async ({ ctx }) => {
      const musics = await ctx.prisma.musics.findMany({
        select: {
          id: true,
          title: true,
          year: true,
          musicLink: true,
          userId: {
            select: {
              userName: true,
            },
          },
          SingerItem: {
            select: {
              singer: {
                select: {
                  name: true,
                },
              },
            },
          },
          GenreItem: {
            select: {
              genreId: {
                select: {
                  name: true,
                },
              },
            },
          },
          _count: {
            select: {
              Likes: true,
            },
          },
        },
      });

      return musics;
    },
  })
  .query('getById', {
    input: DeleteMusicInput,
    resolve: async ({ input, ctx }) => {
      const { id } = input;
      const music =
        await ctx.prisma.musics.findUniqueOrThrow({
          where: {
            id: id,
          },
          select: {
            id: true,
            title: true,
            year: true,
            musicLink: true,
            userId: {
              select: {
                userName: true,
              },
            },
            SingerItem: {
              select: {
                singer: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            GenreItem: {
              select: {
                genreId: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        });
      return music;
    },
  });
