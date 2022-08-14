type Props = {
  columns: {
    title: string;
    accessor?: string;
    Cell: Function;
    cellClass?: string;
    action?: Function;
  }[];
  data: any[] | undefined;
};

export const Table = ({ columns, data }: Props) => {
  return (
    <div className='inline-block shadow-xl min-w-full overflow-hidden align-middle border sm:rounded-xl'>
      <table className='min-w-full table-auto'>
        <thead className='bg-gray-50 border-b border-gray-200  text-left text-gray-500 uppercase'>
          <tr className='text-sm font-medium leading-4 tracking-wider '>
            {columns.map(({ title }, index) => (
              <th
                key={`tbh_${index}`}
                className='px-6 py-4'
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className='bg-white'>
          {data &&
            data.map((row) => (
              <tr key={row.id}>
                {columns.map(
                  (
                    { accessor, Cell, cellClass, action },
                    index
                  ) => (
                    <td
                      key={`tbd_${index}_${row.id}`}
                      className='px-6 py-4 whitespace-no-wrap'
                    >
                      <div className='flex items-center'>
                        <div className={cellClass}>
                          {Cell({
                            value: accessor
                              ? row[accessor]
                              : row,
                            action: action,
                          }) || '_'}
                        </div>
                      </div>
                    </td>
                  )
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
