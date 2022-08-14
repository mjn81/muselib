import { SimpleBadge } from 'components';
import Link from 'next/link';
import React from 'react';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin5Fill } from 'react-icons/ri';

export const MockSingers = [
  {
    name: 'artist 1',
  },
  {
    name: 'artist 2',
  },
  {
    name: 'artist 3',
  },
];

export const MockTableColumns = [
  {
    title: 'id',
    accessor: 'id',
    Cell: ({ value }: { value: string }) => value,
    cellClass: 'text-sm font-medium',
  },
  {
    title: 'name',
    accessor: 'name',
    Cell: ({ value }: { value: string }) => value,
    cellClass: 'text-sm font-medium',
  },
  {
    title: 'email',
    accessor: 'email',
    Cell: ({ value }: { value: string }) => value,
    cellClass: 'text-sm font-medium',
  },
  {
    title: 'status',
    accessor: 'status',
    Cell: ({ value }: { value: string }) => (
      <SimpleBadge>{value}</SimpleBadge>
    ),
  },
  {
    title: 'edit',
    Cell: ({ value }: { value: any }) => (
      <Link href={`genre/edit/${value.id}`}>
        <BiEdit />
      </Link>
    ),
    cellClass:
      'text-2xl font-medium text-blue-400 cursor-pointer',
  },
  {
    title: 'delete',
    Cell: ({ value }: { value: any }) => (
      <Link href={`genre/edit/${value.id}`}>
        <RiDeleteBin5Fill />
      </Link>
    ),
    cellClass:
      'text-2xl font-medium text-rose-500 cursor-pointer',
  },
];

export const MockTableData = [
  {
    id: 1,
    name: 'artist 1',
    email: 'jsoi@gmail.com',
    status: 'active',
  },
  {
    id: 2,
    name: 'artist 2',
    email: 'jnds@gmail.com',
    status: 'active',
  },
];
