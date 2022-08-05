import { Table } from "components";
import { GenreColumns } from "constants/index";
import { AppLayout, ListLayout } from "layouts";
import Link from "next/link";
import { postSuccess, postError } from "utils/res";
import { trpc } from "utils/trpc";

const ManageGenre = () => {
  const { data } = trpc.useQuery(["genre.getGenres"], {
    onError: ({ message }) => {
      postError(message);
    },
  });

  return (
    <ListLayout
      title="ManageGenres"
      btn={{ title: "create genre", path: "genre/create" }}
    >
      <Table columns={GenreColumns} data={data} />
    </ListLayout>
  );
};

export default ManageGenre;
