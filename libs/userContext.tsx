import { User } from '@firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';

// 箱を定義
const AuthContext = createContext<{
  user: User | null;
}>({
  user: null,
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const watch = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      watch();
    };
  }, []);

  return (
    // 中身を詰めて、箱を配る人を用意する
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

// 箱を開ける作業
export const useAuth = () => useContext(AuthContext);
