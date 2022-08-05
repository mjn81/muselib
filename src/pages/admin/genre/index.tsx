import { Button, CreateGenreForms, Table } from "components";
import { AppLayout, FormLayout } from "layouts";
import { MockTableColumns, MockTableData } from "mock";
import Link from "next/link";

const ManageGenre = () => {
  return (
    <AppLayout title="manage genre">
      <div className="flex flex-col">
        <div
          className="cursor-pointer text-sm self-end rounded-xl px-4 py-2 w-fit bg-purple-500 hover:bg-purple-600 transition-colors text-white capitalize mb-3"
        >
          <Link href="genre/create">create genre</Link>
        </div>
        <Table columns={MockTableColumns} data={MockTableData} />
      </div>
    </AppLayout>
  );
};

export default ManageGenre;
