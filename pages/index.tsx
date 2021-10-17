import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import Features from '../components/Features';
import Hero from '../components/Hero';
import { auth } from '../libs/firebase';

const Home = () => {
  const [user, setUser] = useState<User | null>();

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
      setUser(user);
    });
  }, []);

  return (
    <>
      <Hero />
      <Features />
      {user && <p>{user.uid}さんがログイン中です。</p>}
      {user ? (
        <button onClick={signOut}>ログアウト</button>
      ) : (
        <button onClick={signIn}>ログイン</button>
      )}
    </>
  );
};
export default Home;
