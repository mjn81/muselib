import { AppLayout } from "layouts";
import { toast } from "react-toastify";
import { trpc } from "utils/trpc";

const Genres = () => {
  const { data } = trpc.useQuery(["genre.getGenres"], {
    onError: ({ message }) => {
      toast.error(message);
    },
  });
  return (
    <AppLayout title="genres">
      {data?.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </AppLayout>
  );
};

export default Genres;
