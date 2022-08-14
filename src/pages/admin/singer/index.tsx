import { ButtonIcon, Table } from 'components';
import { ListLayout } from 'layouts';
import { MockTableColumns, MockTableData } from 'mock';
import Link from 'next/link';
import React from 'react';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { postError, postSuccess } from 'utils/res';
import { trpc } from 'utils/trpc';

const ManageSinger = () => {
  const { data, refetch } = trpc.useQuery([
    'singer.getAll',
  ]);
  const { mutateAsync } = trpc.useMutation(
    ['singer.delete'],
    {
      onSuccess: () => {
        postSuccess('Singer removed successfully');
      },
      onError: ({ message }) => {
        postError(message);
      },
    }
  );
  const SingerColumns = React.useMemo(
    () => [
      {
        title: 'id',
        accessor: 'id',
        Cell: ({ value }: { value: string }) => value,
        cellClass: 'text-sm font-medium text-gray-900',
      },
      {
        title: 'name',
        accessor: 'name',
        Cell: ({ value }: { value: string }) => value,
        cellClass: 'text-sm font-medium text-gray-500',
      },
      {
        title: 'edit',
        Cell: ({ value }: { value: any }) => (
          <Link href={`singer/${value.id}`}>
            <BiEdit />
          </Link>
        ),
        cellClass:
          'text-2xl font-medium text-blue-400 cursor-pointer',
      },
      {
        title: 'delete',
        Cell: ({ value }: { value: any }) => {
          return (
            <ButtonIcon
              onClick={() =>
                mutateAsync({ id: value.id }).then(() =>
                  refetch()
                )
              }
            >
              <RiDeleteBin5Fill />
            </ButtonIcon>
          );
        },
        cellClass:
          'text-2xl font-medium text-rose-500 cursor-pointer',
      },
    ],
    [mutateAsync, refetch]
  );

  return (
    <ListLayout
      title='manage singers'
      btn={{
        title: 'create singer',
        path: 'singer/create',
      }}
    >
      <Table columns={SingerColumns} data={data}></Table>
    </ListLayout>
  );
};

export default ManageSinger;
