import { BeakerIcon } from '@heroicons/react/solid';
import Dashboard from '../../components/dashboard';
import Heading from '../../components/Heading';
import StampCard from '../../components/StampCard';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../libs/userContext';
import { Article } from '../../types/article';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../libs/firebase';
import { query, where, getDocs } from 'firebase/firestore';

const Stamp = () => {
  const { user } = useAuth();
  // const [article, setArticle] = useState<Article[]>();
  // useEffect(() => {
  //   if (user?.uid) {
  //     const articleRef = collection(db, 'articles');
  //     const q = query(articleRef, where('stamp', 'array-contains', user.uid));
  //     getDocs(q).then((snap) => {
  //       const items = snap.docs.map((doc) => doc.data() as Article);
  //       setArticle(items);
  //     });
  //   }
  // }, [user?.uid]);
  return (
    <div className="w-full">
      <div className="container">
        <Dashboard>
          <div className="mt-6">
            <p className="font-bold text-lg">お寺</p>
            <div className="mt-6 grid grid-cols-6 gap-4">
              {/* {article?.map((article) => (
                <StampCard key={article.id} theme="complete">
                  千光寺
                </StampCard>
              ))} */}
            </div>
          </div>
        </Dashboard>
      </div>
    </div>
  );
};

export default Stamp;
