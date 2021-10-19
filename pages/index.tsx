import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import Features from '../components/Features';
import Hero from '../components/Hero';
import { auth } from '../libs/firebase';
import { useAuth } from '../libs/userContext';

const Home = () => {
  const [cuser, setCUser] = useState<User | null>();
  const { user } = useAuth();
  console.log(user, 'user');

  const signIn = () => {
    signInAnonymously(auth).then(() => {
      alert('ログイン成功');
    });
  };

  const signOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCUser(user);
    });
  }, []);

  return (
    <>
      <Hero />
      <Features />
      {cuser && <p>{cuser.uid}さんがログイン中です。</p>}
      {cuser ? (
        <button onClick={signOut}>ログアウト</button>
      ) : (
        <button onClick={signIn}>ログイン</button>
      )}
    </>
  );
};
export default Home;
