import { BeakerIcon, PencilIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import Heading from '../../components/Heading';
import { useRouter } from 'next/router';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../libs/firebase';
import { query, where, getDocs } from 'firebase/firestore';
import Dashboard from '../../components/dashboard';
import { useAuth } from '../../libs/userContext';
import { limit, orderBy } from 'firebase/firestore';

import { Article } from '../../types/article';
import Date from '../../components/Date';
import Link from 'next/link';

const Management = () => {
  const router = useRouter();
  const { user } = useAuth();

  const toEditPage = async () => {
    if (user.uid) {
      const { id } = await doc(collection(db, 'articles'));
      router.push(`/${user.id}/${id}/edit`);
    }
  };
  const [article, setArticle] = useState<Article[]>();
  useEffect(() => {
    if (user?.uid) {
      const citiesRef = collection(db, 'articles');
      const q = query(citiesRef, where('writerId', '==', user.uid));
      getDocs(q).then((snap) => {
        const items = snap.docs.map((doc) => doc.data() as Article);
        setArticle(items);
      });
    }
  }, [user?.uid]);
  // const [articles, setArticles] = useState<Article[]>();
  // const [articleIds, setArticleIds] = useState();

  // useEffect(() => {
  //   if (user?.uid) {
  //     const articleDoc = doc(db, `users/${user.uid}`);
  //     getDoc(articleDoc).then((result) => {
  //       setArticleIds(result.data().articleIds);
  //     });

  //     const defaultDoc = doc(
  //       db,
  //       // 本来はarticleIdが入ってから取得
  //       `articles/${articleIds}`
  //     );
  //     console.log(articleIds, 'articleId');
  //   }
  // }, [user?.uid]);
  return (
    <Dashboard>
      <div className="w-full text-right my-3">
        <button
          onClick={toEditPage}
          className="rounded p-2 bg-blue-500 shadow text-white"
        >
          投稿する
        </button>
      </div>
      {article?.map((article) => (
        <div key={article.id} className="border-b border-blue-gray-300 pt-2">
          <div className="flex justify-between">
            <span className="font-bold hover:underline text-xl">
              {article.title}
            </span>
            <Link href={`/${article.writer}/${article.id}/edit`}>
              <a>
                <PencilIcon className="h-6 w-6" />
              </a>
            </Link>
          </div>
          <div className="flex items-center my-2">
            <div className="">
              <p className="inline border-blue-600 text-blue-600 rounded border px-2 py-1 mr-3">
                {article.isPublic ? '公開' : '非公開'}
              </p>
              <p className="inline text-gray-400">
                <Date timestamp={article.createdAt} />
              </p>
            </div>
            <div className="ml-auto">
              <p>1200文字</p>
            </div>
          </div>
        </div>
      ))}
    </Dashboard>
  );
};

export default Management;
