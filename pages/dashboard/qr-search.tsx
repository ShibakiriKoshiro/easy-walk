import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Dashboard from '../../components/dashboard';
import { db, functions } from '../../libs/firebase';
import { useAuth } from '../../libs/userContext';
import { Component } from 'react';
import dynamic from 'next/dynamic';
const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false });

const QrSearch = () => {
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
      <div>
        <React.Fragment>
          <div className="mx-auto w-4/5 lg:w-1/2">
            {/* ssrだとvscodeで赤線になる */}
            <QrReader
              delay={1000}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%', margin: '0 auto' }}
            />
            {qrdata && (
              <>
                <div className="-mt-12">
                  <p className="text-center">✔OK</p>
                </div>
                <div className="mt-12">
                  <a className="block" href={qrdata}>
                    <div className="border border-green-600 shadow p-3 font-bold rounded">
                      <p className="">読み込んだURLを見る →</p>
                    </div>
                  </a>
                </div>
              </>
            )}
          </div>
        </React.Fragment>
      </div>
    </Dashboard>
  );
};

export default QrSearch;
