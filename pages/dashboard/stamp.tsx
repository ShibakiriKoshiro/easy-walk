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
    {
      id: '3',
      name: '光明寺',
      visitedAt: null,
    },
  ];
  const [stampData, setStampData] = useState<any[]>();

  useEffect(() => {
    if (user?.uid) {
      const q = query(collection(db, `users/${user.uid}/stamps`));
      getDocs(q).then((snap) => {
        const items = snap.docs.map((doc) => doc.data());

        // const newStamps = stamps.map(stamp => {
        //   const sameIdItem = items.find(item => item.id === stamp.id);

        //   if(sameIdItem){
        //     console.log(sameIdItem,"sameIdItem");

        //     const result = { ...stamp,...sameIdItem };

        //     console.log(result,"結合");
        //     setStampData((stampData)=>[...stampData,result]);
        //   }else{
        //     return stamp
        // }

        const newStamps = stamps.map((stamp) => {
          const sameIdItem = items.find((item) => item.id === stamp.id);

          if (sameIdItem) {
            return {
              ...stamp,
              ...sameIdItem,
            };
          } else {
            return stamp;
          }
        });
        console.log(newStamps, 'new');
        setStampData(newStamps);
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
                        観光した日: <Date timestamp={stamp.visitedAt} />
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
