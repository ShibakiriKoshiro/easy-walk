import { getAuth, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../libs/userContext';
import { auth, db } from '../libs/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { user } from 'firebase-functions/v1/auth';
import router from 'next/router';
type Inputs = {
  userName: string;
  userId: string;
};

const Register = () => {
  const { user } = useAuth();
  useEffect(() => {
    if (user?.id && user?.name) {
      router.push('/');
    }
  }, [user?.uid]);
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleUserId = (event) => {
    setUserId(event.target.value);
  };

  const createUser = async (data) => {
    const userDoc = doc(db, `users/${user.uid}`);
    console.log(data, 'data');
    setDoc(
      userDoc,
      {
        id: data.userId,
        name: data.userName,
        createdAt: Date.now(),
      },
      {
        merge: true,
      }
    ).then(() => {
      router.push('/');
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(createUser)}>
        <input
          placeholder="ユーザーID ※半角英字のみ"
          className="block mx-auto p-1 mt-6 border-gray-300 border-2 rounded w-1/2"
          defaultValue=""
          {...register('userId')}
        />
        <input
          placeholder="ユーザー名"
          className="block mx-auto p-1 mt-6 border-gray-300 border-2 rounded w-1/2"
          defaultValue=""
          {...register('userName')}
        />
        <button type="submit">ボタン</button>
      </form>
      <button>登録を中断する</button>
    </div>
  );
};

export default Register;
