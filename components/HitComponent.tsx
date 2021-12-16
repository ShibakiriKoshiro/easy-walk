import React from 'react';
import Link from 'next/link';
import { Hit } from 'react-instantsearch-core';
import ArticleCard from './ArticleCard';

interface HitDoc {
  objectID: string;
  title: string;
  description: string;
  createdAt: number;
  id: string;
  writerId: string;
  isPublic: boolean;
  category: string;
  writer: string;
  tag: Array<string>;
  thumbnail: string;
}

interface Props {
  hit: Hit<HitDoc>;
}

interface HitComponentProps extends Props {
  onClick: () => void;
}

function HitComponent({ hit }: HitComponentProps | null): JSX.Element {
  return (
    <ArticleCard
      thumbnail={hit?.thumbnail}
      key={hit.id}
      title={hit.title}
      href={`/${hit.writer}/${hit.id}`}
      user={hit.writerId}
      date={hit.createdAt}
    />
  );
}

export const hitComponent = ({ hit }: Props): JSX.Element => (
  <HitComponent hit={hit} onClick={() => null} />
);
