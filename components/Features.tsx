import React from 'react';
import ArticleCard from './ArticleCard';

const Features = () => {
  return (
    <div>
      <div className="w-full">
        <div className="container">
          <p className="text-xl font-bold mt-12">人気記事</p>
        </div>
      </div>
      <ArticleCard />
    </div>
  );
};

export default Features;
