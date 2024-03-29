import { Role } from '@prisma/client';
import { deleteFile, uploadFile } from 'helpers';
import { getEnv } from 'utils/env';
import { trpc } from 'utils/trpc';
import { FormFieldTypes } from './types';

export const GENRE_FIELDS = [
  {
    fieldType: FormFieldTypes.input,
    name: 'name',
    type: 'text',
    placeholder: 'Please enter genre name',
  },
];

export const SINGER_FIELDS = [
  {
    fieldType: FormFieldTypes.input,
    name: 'name',
    type: 'text',
    placeholder: 'Please enter singer name',
  },
];

export const EDIT_USER_FIELDS = [
  {
    fieldType: FormFieldTypes.input,
    name: 'fullName',
    type: 'text',
    placeholder: 'Please enter fullname',
  },
  {
    fieldType: FormFieldTypes.input,
    name: 'userName',
    type: 'text',
    placeholder: 'Please enter username',
  },
  {
    fieldType: FormFieldTypes.input,
    name: 'email',
    type: 'text',
    placeholder: 'Please enter email',
  },
  {
    fieldType: FormFieldTypes.select,
    name: 'role',
    type: 'select',
    options: [
      {
        value: Role.CLIENT,
        label: 'Client',
      },
      {
        value: Role.ADMIN,
        label: 'Admin',
      },
    ],
  },
  {
    fieldType: FormFieldTypes.input,
    name: 'profile',
    type: 'text',
    placeholder: 'Please enter profile link',
  },
];

export const CREATE_MUSIC_FIELDS = [
  {
    fieldType: FormFieldTypes.input,
    name: 'title',
    type: 'text',
    placeholder: 'Please enter title',
  },
  {
    fieldType: FormFieldTypes.file,
    fetcher: (
      file: File,
      setProgress: (progress: number) => void
    ) => {
      const formData = new FormData();
      formData.append('name', file.name);
      formData.append('file', file);
      formData.append(
        'category',
        process.env.NEXT_PUBLIC_MJOLNIR_CATEGORY_MUSIC ?? ''
      );
      return uploadFile(
        `${process.env.NEXT_PUBLIC_MJOLNIR_URL}/file`,
        process.env.NEXT_PUBLIC_MJOLNIR_TOKEN ?? '',
        formData,
        setProgress
      );
    },
    deleter: (id: string) => {
      return deleteFile(
        `${process.env.NEXT_PUBLIC_MJOLNIR_URL}/file/${id}`,
        process.env.NEXT_PUBLIC_MJOLNIR_TOKEN ?? ''
      );
    },
    name: 'musicLink',
    accessor: ({ data }: any) => data.id,
  },
  {
    fieldType: FormFieldTypes.date,
    name: 'year',
  },
  {
    fieldType: FormFieldTypes.multiselect,
    name: 'genres',
    fetcher: () => {
      const { data } = trpc.useQuery(['genre.getAll']);
      if (data) {
        return {
          isLoading: false,
          options: data.map(({ id, name }) => ({
            value: id,
            label: name,
          })),
        };
      }
      return {
        isLoading: true,
        options: [],
      };
    },
    placeholder: 'select genres',
  },
  {
    fieldType: FormFieldTypes.multiselect,
    name: 'singers',
    fetcher: () => {
      const { data } = trpc.useQuery(['singer.getAll']);
      if (data) {
        return {
          isLoading: false,
          options: data.map(({ id, name }) => ({
            value: id,
            label: name,
          })),
        };
      }
      return {
        isLoading: true,
        options: [],
      };
    },
    placeholder: 'select singers...',
  },
];
