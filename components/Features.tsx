import React from 'react';
import ArticleCard from './ArticleCard';

const Features = () => {
  return (
    <div className="my-12">
      <div className="w-full">
        <div className="container">
          <p className="text-xl font-bold mt-12">人気記事</p>
        </div>
      </div>
      <div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 container">
          <ArticleCard title="タイトル" />
          <ArticleCard title="タイトルです。タイトルです。タイトルです。タイトルです。" />
        </div>
      </div>
    </div>
  );
};

export default Features;
