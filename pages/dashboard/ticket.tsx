import React, { useState } from 'react';
import Dashboard from '../../components/dashboard';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../../libs/userContext';
import { useRouter } from 'next/router';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../libs/firebase';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Ticket = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [barTicket, setBarTicket] = useState('');

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
    }
    if (query.get('canceled')) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      );
    }
  }, []);
  // const buyTicket = () => {
  //   if (user) {
  //     const newTicket: any = doc(db, 'users', user.uid);
  //     setDoc(newTicket, {
  //       // チケット名&チケット枚数
  //       barTicket: 3,
  //     });
  //     setBarTicket(user.uid);
  //   } else {
  //     router.push('/');
  //   }
  // };

  return (
    <Dashboard>
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <form action="/api/checkout-create" method="POST">
            <section>
              <button type="submit" role="link">
                <div className="border p-3 shadow hover:bg-pink-200 rounded">
                  <h3 className="text-2xl font-bold text-center">
                    バルチケット
                  </h3>
                  <p className="text-gray-600 text-left mt-3">
                    3枚つづりのチケットです。対象の店舗でQRコードを読み込んで使用出来ます。
                  </p>
                  <p className="text-right mt-3">残り　2枚</p>
                </div>
              </button>
            </section>
          </form>
        </div>
      </div>
    </Dashboard>
  );
};

export default Ticket;
