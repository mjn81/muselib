import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";

export const GenreColumns = [
  {
    title: "id",
    accessor: "id",
    Cell: ({ value }: { value: string }) => value,
    cellClass: "text-sm font-medium",
  },
  {
    title: "name",
    accessor: "name",
    Cell: ({ value }: { value: string }) => value,
    cellClass: "text-sm font-medium",
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
    Cell: ({ value }: { value: any }) => (
      <Link href={`genre/${value.id}`}>
        <RiDeleteBin5Fill />
      </Link>
    ),
    cellClass:
      "text-2xl font-medium text-rose-500 cursor-pointer",
  },
];
