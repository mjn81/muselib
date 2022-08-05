import { ButtonIcon, Table } from "components";
import { ListLayout } from "layouts";
import Link from "next/link";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { postSuccess, postError } from "utils/res";
import { trpc } from "utils/trpc";

const ManageGenre = () => {
  const { data, refetch, isLoading } = trpc.useQuery(
    ["genre.getAll"],
    {
      onError: ({ message }) => {
        postError(message);
      },
    }
  );
  const { mutateAsync } = trpc.useMutation(
    ["genre.delete"],
    {
      onSuccess: () => {
        postSuccess("Genre deleted successfully");
      },
      onError: ({ message }) => {
        postError(message);
      },
    }
  );
  const GenreColumns = React.useMemo(() =>[
    {
      title: "id",
      accessor: "id",
      Cell: ({ value }: { value: string }) => value,
      cellClass: "text-sm font-medium text-gray-900",
    },
    {
      title: "name",
      accessor: "name",
      Cell: ({ value }: { value: string }) => value,
      cellClass: "text-sm font-medium text-gray-500",
    },
    {
      title: "edit",
      Cell: ({ value }: { value: any }) => (
        <Link href={`genre/${value.id}`}>
          <BiEdit />
        </Link>
      ),
      cellClass:
        "text-2xl font-medium text-blue-400 cursor-pointer",
    },
    {
      title: "delete",
      Cell: ({ value }: { value: any }) => {
        return (
          <ButtonIcon
            onClick={() =>
              mutateAsync({ id: value.id }).then(
                () => refetch()
              )
            }
          >
            <RiDeleteBin5Fill />
          </ButtonIcon>
        );
      },
      cellClass:
        "text-2xl font-medium text-rose-500 cursor-pointer",
    },
  ], [mutateAsync, refetch]);
  
  return (
    <ListLayout
      title="manage genres"
      btn={{ title: "create genre", path: "genre/create" }}
    >
      <Table columns={GenreColumns} data={data} />
    </ListLayout>
  );
};

export default ManageGenre;
