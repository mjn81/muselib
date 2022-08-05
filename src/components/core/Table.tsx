import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";

type Props = {
  columns: {
    title: string;
    accessor?: string;
    Cell: Function;
    cellClass?: string;
  }[];
  data: any[];
};

export const Table = ({ columns, data }: Props) => {
  return (
    <div className="inline-block shadow-xl min-w-full overflow-hidden align-middle border sm:rounded-xl">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50 border-b border-gray-200  text-left text-gray-500 uppercase">
          <tr className="text-sm font-medium leading-4 tracking-wider ">
            {columns.map(({ title }, index) => (
              <th
                key={`tbh_${index}`}
                className="px-6 py-4"
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white">
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map(
                ({ accessor, Cell, cellClass }, index) => (
                  <td
                    key={`tbd_${index}_${row.id}`}
                    className="px-6 py-4 whitespace-no-wrap"
                  >
                    <div className="flex items-center">
                      <div
                        className={
                          cellClass + " " +
                          (index === 0
                            ? "text-gray-900"
                            : "text-gray-500")
                        }
                      >
                        {Cell({
                          value: accessor
                            ? row[accessor]
                            : row,
                        })}
                      </div>
                    </div>
                  </td>
                )
              )}
              {/* <td className=" px-6 py-4 text-2xl  whitespace-no-wrap">
                <BiEdit />
              </td>
              <td className="px-6 py-4 text-2xl  whitespace-no-wrap">
                <RiDeleteBin5Fill />
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

//  <div className="inline-block shadow-xl min-w-full overflow-hidden align-middle border sm:rounded-xl">
//    <table className="min-w-full table-auto">
//      <thead>
//        <tr className="text-sm font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
//          <th className="px-6 py-4">Id</th>
//          <th className="px-6 py-4">Name</th>
//          <th className="px-6 py-4">Email</th>
//          <th className="px-6 py-4">Status</th>
//          <th className="px-6 py-4">Edit</th>
//          <th className="px-6 py-4">Delete</th>
//        </tr>
//      </thead>

//      <tbody className="bg-white">
//        <tr>
//          <td className="px-6 py-4">1</td>
//          <td className="px-6 py-4 whitespace-no-wrap">
//            <div className="flex items-center">
//              <div className="text-sm font-medium text-gray-900">
//                John Doe
//              </div>
//            </div>
//          </td>

//          <td className="px-6 py-4 whitespace-no-wrap">
//            <div className="text-sm ">
//              john@example.com
//            </div>
//          </td>

//          <td className="px-6 py-4 whitespace-no-wrap">
//            <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
//              Active
//            </span>
//          </td>
//          <td className=" px-6 py-4 text-2xl text-blue-400 whitespace-no-wrap">
//            <BiEdit />
//          </td>
//          <td className="px-6 py-4 text-2xl text-rose-500 whitespace-no-wrap">
//            <RiDeleteBin5Fill />
//          </td>
//        </tr>
//      </tbody>
//    </table>
//  </div>;
