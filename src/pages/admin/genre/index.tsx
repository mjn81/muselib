import { Button, CreateGenreForms } from "components";
import { AppLayout, FormLayout } from "layouts";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";

const ManageGenre = () => {
  return (
    <AppLayout title="manage genre">
      <div className="flex flex-col">
        <div
          className="cursor-pointer text-sm self-end rounded-xl px-4 py-2 w-fit bg-purple-500 hover:bg-purple-600 transition-colors text-white capitalize mb-3"
        >
          <Link href="genre/create">create genre</Link>
        </div>
        <div className="inline-block shadow-xl min-w-full overflow-hidden align-middle border sm:rounded-xl">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-sm font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4">Id</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Edit</th>
                <th className="px-6 py-4">Delete</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              <tr>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                      John Doe
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-sm text-gray-500">
                    john@example.com
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap">
                  <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                    Active
                  </span>
                </td>
                <td className=" px-6 py-4 text-2xl text-blue-400 whitespace-no-wrap">
                  <BiEdit />
                </td>
                <td className="px-6 py-4 text-2xl text-rose-500 whitespace-no-wrap">
                  <RiDeleteBin5Fill />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default ManageGenre;
