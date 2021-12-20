import React from 'react';
import { connectHits } from 'react-instantsearch-dom';
import ArticleCard from '../ArticleCard';

const HitResult = ({ hits }) => (
  <ol className="grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4">
    {hits.map((hit) => (
      <ArticleCard
        thumbnail={hit?.thumbnail}
        key={hit.id}
        title={hit.title}
        href={`/${hit.writer}/${hit.id}`}
        user={hit.writerId}
        date={hit.createdAt}
      />
    ))}
  </ol>
);

export const CustomHits = connectHits(HitResult);
