import Image from 'next/image';
import { ReactNode, useState } from 'react';
import { BsSoundwave } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import {
  MdMoreVert,
  MdPlayCircleFilled,
} from 'react-icons/md';
import { TooltipDropdown } from './Dropdown';

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

type MusicProps = {
  data: any[] | undefined;
  options: {
    onClick?: (e: any) => void;
    children: ReactNode;
  }[];
};

export const MusicTable = ({
  data,
  options,
}: MusicProps) => {
  return (
    <table className='w-full table-fixed'>
      <thead className='text-left capitalize hidden'>
        <tr>
          <th>id</th>
          <th>music info</th>
          <th>music</th>
          <th>options</th>
        </tr>
      </thead>
      <tbody className='space-y-7'>
        {data &&
          data.map((row, index) => (
            <tr
              key={`mu_${row.id}`}
              className='flex items-center space-x-6'
            >
              <td className='font-medium text-gray-400'>
                {(index + 1).toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
              </td>
              <td className='flex items-center flex-1 space-x-4'>
                <section className='bg-slate-300 overflow-hidden rounded-xl'>
                  <Image
                    src='https://via.placeholder.com/150'
                    alt='alt'
                    width={60}
                    height={50}
                  />
                </section>
                <section className='space-y-1'>
                  <h5 className='font-medium text-gray-800 capitalize'>
                    {row.title}
                  </h5>
                  <span className='text-sm flex items-center text-gray-400 space-x-3'>
                    <div className='flex items-center space-x-1'>
                      <FaUserCircle />
                      {row.SingerItem.map(
                        (
                          {
                            singer,
                          }: { singer: { name: string } },
                          index: number
                        ) => (
                          <p
                            key={`sing_${row.id}_${index}`}
                          >
                            {singer.name +
                              (index !==
                              row.SingerItem.length - 1
                                ? ' . '
                                : '')}
                          </p>
                        )
                      )}
                    </div>
                    <div className='flex items-center space-x-1'>
                      <BsSoundwave />
                      {row.GenreItem.map(
                        (
                          {
                            genreId,
                          }: { genreId: { name: string } },
                          index: number
                        ) => (
                          <p
                            key={`sing_${row.id}_${index}`}
                          >
                            {genreId.name +
                              (index !==
                              row.GenreItem.length - 1
                                ? ' . '
                                : '')}
                          </p>
                        )
                      )}
                    </div>
                  </span>
                </section>
              </td>

              <td className='w-fit'>
                {/* phase 3 : refactor button to a better looking one */}
                <section className='cursor-pointer flex items-center justify-center text-light_purple text-4xl'>
                  <MdPlayCircleFilled />
                </section>
              </td>
              <td className='w-fit'>
                <TooltipDropdown
                  options={options}
                  className='cursor-pointer text-gray-600 text-lg'
                >
                  <MdMoreVert />
                </TooltipDropdown>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
