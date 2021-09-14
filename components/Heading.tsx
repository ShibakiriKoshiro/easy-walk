import { SearchIcon } from '@heroicons/react/solid';
import React from 'react';

const Heading = () => {
  return (
    <div className="py-6 container">
      <div className="flex items-center">
        <SearchIcon className="h-6 w-6 mr-6" />
        <p className="text-xl font-bold">タイトルです。</p>
      </div>
    </div>
  );
};

export default Heading;
