import { BeakerIcon } from '@heroicons/react/solid';
import React from 'react';
import ArticleCard from '../components/ArticleCard';
import Heading from '../components/Heading';
import Article from '../types/article-card';

type Props = {
  articles: Article[];
};

const MyList = ({ articles }: Props) => {
  return (
    <div>
      <Heading>
        <BeakerIcon className="h-6 w-6 mr-6" />
        <p className="text-xl font-bold">見出しです！</p>
      </Heading>
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
