import React from 'react';
import ArticleCard from '../components/ArticleCard';
import Heading from '../components/Heading';

const MyList = () => {
  return (
    <div>
      <Heading />
      <div className="w-full">
        <div className="">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 container">
            <ArticleCard title="タイトル" />
            <ArticleCard title="タイトルです。タイトルです。タイトルです。タイトルです。" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyList;
