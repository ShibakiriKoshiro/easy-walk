import { SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { articleIndex } from '../libs/algolia';

type Inputs = {
  searchWord: string;
};

const Search = () => {
  const [word, setWord] = useState();
  const [searchResult, setSearchResult] = useState<number>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data) => console.log(data);

  const search = (value: string) => {
    articleIndex.search<any>(value).then((result) => {
      console.log(result.hits, 'hit');
      setSearchResult(result.nbHits);
    });
  };
  const handleWord = (event) => {
    console.log(event.target.value, '値');
    search(event.target.value);
  };
  return (
    <div className="container mt-16">
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="relative py-3 px-6 border-gray-300 border-4 rounded-full mx-auto w-full"
      >
        <input
          placeholder="ユーザー名"
          className="px-3 text-lg w-full outline-none"
          {...register('searchWord', { required: true })}
          onChange={(event) => handleWord(event)}
        />
        <button className="right-6 absolute py-auto" type="submit">
          <SearchIcon className="h-8 w-8" />
        </button>
      </form>
      <div className="grid grid-cols-6 mt-6">
        <Link href="#">
          <a>
            <div className="border-2 shadow border-gray-400 p-2 rounded-lg text-center hover:bg-indigo-200">
              <SearchIcon className="h-8 w-8 mx-auto" />
              <p className="pt-2">しまなみ海道</p>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Search;
