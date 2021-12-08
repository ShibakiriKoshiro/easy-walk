/* eslint-disable @next/next/no-img-element */
import { collection, doc, getDoc, limit } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import { auth, db } from '../libs/firebase';
import { Article } from '../types/article';
import { User } from '../types/User';
import { query, where, getDocs } from 'firebase/firestore';

const About = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [descriotion, setDescriotion] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uid, setUid] = useState('');
  const [user, setUser] = useState<User>();
  const [article, setArticle] = useState<Article[]>();

  useEffect(() => {
    if (userId) {
      const userRef = collection(db, 'users');
      const q = query(userRef, where('id', '==', userId), limit(1));
      getDocs(q).then((snap) => {
        const item = snap.docs.map((doc) => doc.data() as User);
        setName(item[0].name);
        setLink(item[0].link);
        setUid(item[0].uid);
        setDescriotion(item[0].descriotion);
        setAvatarUrl(item[0].avatarUrl);
      });

      const citiesRef = collection(db, 'articles');
      const p = query(citiesRef, where('writer', '==', userId));
      getDocs(p).then((snap) => {
        const items = snap.docs.map((doc) => doc.data() as Article);
        console.log(items, 'articles');
        setArticle(items);
      });
    }
  }, [userId]);

  return (
    <div className="container mt-16">
      <div className="flex items-center">
        <img src={avatarUrl} alt="photo" className="rounded-full w-32 h-32" />
        <div className="ml-6">
          <p className="font-bold text-2xl">{name}</p>
          <a href={link} className="text-sm text-blue-600">
            {link}
          </a>
        </div>
      </div>
      <div className="border-b border-blue-gray-300 mt-3 py-1">
        <p>{descriotion}</p>
      </div>
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
    </div>
  );
};

export default About;
