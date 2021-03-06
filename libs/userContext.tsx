import { onAuthStateChanged } from '@firebase/auth';
import { doc, getDoc, onSnapshot } from '@firebase/firestore';
import { sendEmailVerification } from 'firebase/auth';
import router from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/User';
import { auth, db } from './firebase';

// 箱を定義
const AuthContext = createContext<{
  user: User | null;
}>({
  user: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    let unsubscribeUser;
    // ログインユーザー監視
    const unsubscribeAuthState = onAuthStateChanged(auth, async (fbUser) => {
      //メール認証
      if (auth.currentUser && !auth.currentUser.emailVerified) {
        router.push('/check-email');
      }

      if (fbUser) {
        unsubscribeUser?.();
        unsubscribeUser = onSnapshot(doc(db, `users/${fbUser.uid}`), (doc) => {
          // resultの値がおかしい
          const resultUser = doc.data();

          if (resultUser && !resultUser.name) {
            router.push('/register');
          }
          // セット出来ていない。
          setUser(doc.data() as User);
        });
      }
      if (!fbUser) {
        setUser(null);
      }

      // ユーザーのidと名前がなければ登録ページへ
      // const userDoc = await doc(db, `users/${user?.uid}`);
      // await getDoc(userDoc).then(async (result) => {
      //   const userData = await result.data();
      //   if (user) {
      //     if (userData?.id && userData?.uid) {
      //     } else {
      //       router.push('/register');
      //     }
      //   }
      // });
    });

    return () => {
      unsubscribeAuthState();
      unsubscribeUser?.();
    };
  }, []);

  return (
    // 中身を詰めて、箱を配る人を用意する
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

// 箱を開ける作業
export const useAuth = () => useContext(AuthContext);
