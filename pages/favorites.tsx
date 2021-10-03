import React from 'react';
import ArticleCard from '../components/ArticleCard';
import Heading from '../components/Heading';

const MyList = () => {
  return (
    <div>
      <Heading heading="お気に入りの記事" heroIconName="SearchIcon" />
      <div className="w-full">
        <div className="">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 container">
            <ArticleCard
              title="タイトル"
              href="/article/1"
              user="ユーザー名"
              date="2021-10-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyList;
