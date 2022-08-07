import { ButtonIcon, SimpleBadge, Table } from "components";
import { ListLayout } from "layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { postError, postSuccess } from "utils/res";
import { trpc } from "utils/trpc";

// phase 2 : add create user for admin as well!!

const ManageUser = () => {
  const router = useRouter();
  const { data, refetch } = trpc.useQuery(["user.getAll"], {
    onError: ({ message }) => {
      postError(message);
      router.push("/app");
    }
  });
  const { mutateAsync } = trpc.useMutation(
    ["user.delete"],
    {
      onSuccess: () => {
        postSuccess("Singer removed successfully");
      },
      onError: ({ message }) => {
        postError(message);
      },
    }
  );
  const UserColumns = React.useMemo(
    () => [
      {
        title: "id",
        accessor: "id",
        Cell: ({ value }: { value: string }) =>
          value.slice(0, 5) + "...",
        cellClass: "text-sm font-medium text-gray-900",
      },
      {
        title: "name",
        accessor: "fullName",
        Cell: ({ value }: { value: string }) => value,
        cellClass: "text-sm font-medium text-gray-500",
      },
      {
        title: "username",
        accessor: "userName",
        Cell: ({ value }: { value: string }) => value,
        cellClass: "text-sm font-medium text-gray-500",
      },
      {
        title: "email",
        accessor: "email",
        Cell: ({ value }: { value: string }) => value,
        cellClass: "text-sm font-medium text-gray-500",
      },
      {
        title: "password",
        accessor: "password",
        Cell: ({ value }: { value: string }) =>
          value.slice(0, 5) + "...",
        cellClass: "text-sm font-medium text-gray-500",
      },
      {
        title: "profile",
        accessor: "profile",
        Cell: ({ value }: { value: string }) => value,
        cellClass: "text-sm font-medium text-gray-500",
      },
      {
        title: "role",
        accessor: "role",
        Cell: ({ value }: { value: string }) => (
          <SimpleBadge>{value}</SimpleBadge>
        ),
      },
      {
        title: "likes",
        accessor: "_count",
        Cell: ({ value }: { value: { Likes: number } }) => (
          <SimpleBadge>{value.Likes}</SimpleBadge>
        ),
      },
      {
        title: "edit",
        Cell: ({ value }: { value: any }) => (
          <Link href={`user/${value.id}`}>
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
          "text-2xl font-medium text-rose-500 cursor-pointer",
      },
    ],
    [mutateAsync, refetch]
  );
  return (
    <ListLayout title="manage users" btn={{ hidden: true }}>
      <Table columns={UserColumns} data={data} />
    </ListLayout>
  );
};

export default ManageUser;
