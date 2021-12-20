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
import { Stamp } from '../../types/stamp';

const StampFile = () => {
  const { user } = useAuth();
  const [stamps, setStamps] = useState<Stamp[]>();
  const [stampData, setStampData] = useState<any[]>();
  useEffect(() => {
    if (user?.uid) {
      const articleRef = collection(db, 'articles');
      const q = query(articleRef, where('spotCategory', '==', 'お寺'));
      getDocs(q).then((snap) => {
        const items = snap.docs.map((doc) => doc.data() as Stamp);
        setStamps(() => items);
      });
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user?.uid && stamps) {
      const q = query(collection(db, `users/${user.uid}/stamps`));
      getDocs(q).then((snap) => {
        const items = snap.docs.map((doc) => doc.data());
        const newStamps = stamps.map((stamp) => {
          const sameIdItem = items.find((item) => item.spotId === stamp.spotId);

          if (sameIdItem) {
            return {
              ...stamp,
              ...sameIdItem,
            };
          } else {
            return stamp;
          }
        });
        setStampData(newStamps);
        console.log(newStamps, 'new');
      });
    }
  }, [user?.uid, stamps?.length]);

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
    <Dashboard>
      <div className="mt-6">
        <p className="font-bold text-lg">お寺</p>
        <div className="mt-6 grid grid-cols-6 gap-4">
          {stampData?.map((stamp) => (
            <StampCard
              key={stamp.spotId}
              theme={stamp.visitedAt ? 'complete' : 'incomplete'}
            >
              {stamp.spotName}
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
  );
};

export default StampFile;
