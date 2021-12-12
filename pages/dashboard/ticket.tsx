import { loadStripe } from '@stripe/stripe-js';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Dashboard from '../../components/dashboard';
import { db, functions } from '../../libs/firebase';
import { useAuth } from '../../libs/userContext';
import { Component } from 'react';

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

  const startCheckout = async () => {
    const ref = collection(db, `customers/${user.uid}/checkout_sessions`);
    const docRef = await addDoc(ref, {
      mode: 'payment',
      price: 'price_1K52KYHTrQUbry083qZOYzFz', // One-time price created in Stripe
      success_url: window.location.origin,
      cancel_url: window.location.origin,
      // tax_rates: ['txr_1K52OKHTrQUbry08uPI4UQUj'],
    });

    onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data();
      if (error) {
        alert(`An error occured: ${error.message}`);
      }
      if (url) {
        window.location.assign(url);
      }
    });
  };

  const toPortal = async () => {
    const callable = httpsCallable(
      functions,
      'ext-firestore-stripe-payments-createPortalLink'
    );

    const { data }: any = await callable({
      returnUrl: window.location.origin,
    });
    window.location.assign(data?.url);
  };

  const [qrdata, setQrdata] = useState();

  const handleScan = (data) => {
    if (data) {
      setQrdata(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <Dashboard>
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <section>
            <button onClick={toPortal}>portal</button>
            <button onClick={startCheckout} type="submit" role="link">
              <div className="border p-3 shadow hover:bg-pink-200 rounded">
                <h3 className="text-2xl font-bold text-center">バルチケット</h3>
                <p className="text-gray-600 text-left mt-3">
                  3枚つづりのチケットです。対象の店舗でQRコードを読み込んで使用出来ます。
                </p>
                <p className="text-right mt-3">残り　2枚</p>
              </div>
            </button>
          </section>
        </div>
      </div>
    </Dashboard>
  );
};

export default Ticket;
