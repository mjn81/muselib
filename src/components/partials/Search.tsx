import React from 'react';
import { FiSearch } from 'react-icons/fi';

export const SearchField = () => {
  return (
    <div className='flex flex-row-reverse border-2 border-gray-100 rounded-full'>
      <input
        type='search'
        className='rounded-full w-48 placeholder:text-gray-300 outline-none py-2.5 px-3'
        placeholder='Type here to search'
      />
      <button
        type='submit'
        className='text-3xl ml-2 text-extra_dark_purple'
      >
        <FiSearch />
      </button>
    </div>
  );
};
