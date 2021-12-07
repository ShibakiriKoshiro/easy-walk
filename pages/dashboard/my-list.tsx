import { BeakerIcon } from '@heroicons/react/solid';
import ArticleCard from '../../components/ArticleCard';
import Dashboard from '../../components/dashboard';
import Heading from '../../components/Heading';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../libs/userContext';
import { Article } from '../../types/article';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../libs/firebase';
import { query, where, getDocs } from 'firebase/firestore';

const MyList = () => {
  const { user } = useAuth();
  const [article, setArticle] = useState<Article[]>();
  useEffect(() => {
    if (user?.uid) {
      const articleRef = collection(db, 'articles');
      const q = query(
        articleRef,
        where('favorite', 'array-contains', user.uid)
      );
      getDocs(q).then((snap) => {
        const items = snap.docs.map((doc) => doc.data() as Article);
        setArticle(items);
      });
    }
  }, [user?.uid]);

  return (
    <div className="w-full">
      <div className="container">
        <Dashboard>
          <div className="mt-6">
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
              {article?.map((article) => (
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
        </Dashboard>
      </div>
    </div>
  );
};

export default MyList;
