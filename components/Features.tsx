import ArticleCard from './ArticleCard';
import React, { FormEvent, useEffect, useState } from 'react';
import { db, storage } from '../libs/firebase';
import { doc, getDoc, limit, orderBy, setDoc } from 'firebase/firestore';
import { useAuth } from '../libs/userContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Article } from '../types/article';
import { format } from 'date-fns';

const Features = () => {
  const [articles, setArticles] = useState<Article[]>();
  const q = query(
    collection(db, 'articles'),
    limit(20),
    orderBy('createdAt', 'desc')
  );

  useEffect(() => {
    getDocs(q).then((snap) => {
      const items = snap.docs.map((doc) => doc.data() as Article);
      setArticles(items);
    });
  }, []);

  return (
    <div className="my-12">
      <div className="w-full">
        <div className="container">
          <p className="text-xl font-bold mt-12">人気記事</p>
        </div>
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 container">
        {articles?.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            href={`/${article.writer}/${article.id}`}
            user={article.writerId}
            date={article.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
