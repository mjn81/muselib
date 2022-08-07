import { SimpleBadge, Table } from "components";
import { ListLayout } from "layouts";
import Link from "next/link";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { trpc } from "utils/trpc";

const ManageMusic = () => {
  const { data } = trpc.useQuery(["music.getAll"]);
  const musicColumns = React.useMemo(
    () => [
      {
        title: "id",
        accessor: "id",
        Cell: ({ value }: { value: string }) => value,
        cellClass: "text-sm font-medium text-gray-900",
      },
      {
        title: "title",
        accessor: "title",
        Cell: ({ value }: { value: string }) => value,
        cellClass: "text-sm font-medium text-gray-500",
      },
      {
        title: "year",
        accessor: "year",
        Cell: ({ value }: { value: Date }) =>
          value.toLocaleString(),
        cellClass: "text-sm font-medium text-gray-500",
      },
      {
        title: "music",
        accessor: "musicLink",
        Cell: ({ value }: { value: string }) => value,
        cellClass: "text-sm font-medium text-gray-500",
      },
      // {
      //   title: "singers",
      //   accessor: "SingerItem",
      //   Cell: ({ value }: { value: any }) =>
      //     value.toString(),
      //   cellClass: "text-sm font-medium text-gray-500",
      // },
      // {
      //   title: "genres",
      //   accessor: "GenreItem",
      //   Cell: ({ value }: { value: any }) =>
      //     value.toString(),
      //   cellClass: "text-sm font-medium text-gray-500",
      // },
      {
        title: "uploader",
        accessor: "userId",
        Cell: ({ value }: { value: any }) => value.userName,
        cellClass: "text-sm font-medium text-gray-500",
      },
      {
        title: "likes",
        accessor: "_count",
        Cell: ({ value }: { value: any }) => (
          <SimpleBadge>{value.Likes}</SimpleBadge>
        ),
      },
      {
        title: "edit",
        Cell: ({ value }: { value: any }) => (
          <Link href={`music/${value.id}`}>
            <BiEdit />
          </Link>
        ),
        cellClass:
          "text-2xl font-medium text-blue-400 cursor-pointer",
      },
    ],
    []
  );

  return (
    <ListLayout
      title="manage musics"
      btn={{
        title: "add music",
        path: "/admin/music/create",
      }}
    >
      <Table columns={musicColumns} data={data} />
    </ListLayout>
  );
};

export default ManageMusic;
