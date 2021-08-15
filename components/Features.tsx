import React from 'react';
import ArticleCard from './ArticleCard';

const Features = () => {
  return (
    <div>
      <div className="w-full">
        <div className="container">
          <p className="text-xl font-bold mt-12">人気記事</p>
          <div className="grid grid-cols-4 gap-4">
            <div className="border "></div>
          </div>
        </div>
      </div>
      <ArticleCard />
    </div>
  );
};

export default Features;
