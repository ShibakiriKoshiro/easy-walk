import { BeakerIcon } from '@heroicons/react/solid';
import React from 'react';
import ArticleCard from '../../components/ArticleCard';
import Dashboard from '../../components/dashboard';
import Heading from '../../components/Heading';
import Article from '../../types/article-card';

type Props = {
  articles: Article[];
};

const MyList = ({ articles }: Props) => {
  return (
    <div className="w-full">
      <div className="container">
        <Dashboard>
          <div className="mt-6">
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
              <ArticleCard
                title="タイトル"
                href="/article/1"
                user="ユーザー名"
                date="2021-10-10"
              />
            </div>
          </div>
        </Dashboard>
      </div>
    </div>
  );
};

export default MyList;
