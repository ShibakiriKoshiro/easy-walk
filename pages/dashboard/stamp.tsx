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
import { startOfMonth } from 'date-fns';
import Date from '../../components/Date';

const Stamp = () => {
  const { user } = useAuth();
  const stamps = [
    {
      id: '1',
      name: '千光寺',
      visitedAt: null,
    },
    {
      id: '2',
      name: '慈光寺',
      visitedAt: null,
    },
  ];
  const [stampData, setStampData] = useState<any[]>(stamps);

  useEffect(() => {
    if (user?.uid) {
      const q = query(collection(db, `users/${user.uid}/stamps`));
      getDocs(q).then((snap) => {
        const items = snap.docs.map((doc) => doc.data());
        const foundIds = items.map((item) => item.id);
        console.log(foundIds, 'firestoreにあるデータのid');
        const result: any = stamps.map((stamp) => stamp);
        for (let i = 0; i < foundIds.length; i++) {
          const found = result.find(({ id }) => id == foundIds[i]);
          console.log(found, 'データを書き換えるリスト');
          const data = items.find(({ id }) => id == foundIds[i]);
          console.log(data, 'firestore書き換えるobj');
          Object.assign(found, data);
          console.log(found, '上書きしたデータ');
          setStampData([...stampData, found]);
        }
      });
    }
  }, [user?.uid]);

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
              {stampData?.map((stamp) => (
                <StampCard
                  key={stamp.name}
                  theme={stamp.visitedAt ? 'complete' : 'incomplete'}
                >
                  {stamp.name}
                  <div>
                    {stamp.visitedAt && (
                      <span>
                        観光した日: <Date timestamp={stamp.visitedAt} />{' '}
                      </span>
                    )}
                  </div>
                </StampCard>
              ))}
            </div>
          </div>
        </Dashboard>
      </div>
    </div>
  );
};

export default Stamp;
