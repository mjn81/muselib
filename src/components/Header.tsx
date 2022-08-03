import React from 'react'
import { SearchField } from './Search';

export const Header = ({title}:{title:string}) => {
  return (
    <header className="flex items-center justify-between">
      <h1 className="capitalize text-4xl font-semibold text-extra_dark_purple">
        {title}
      </h1>
      <SearchField />
    </header>
  );
}
