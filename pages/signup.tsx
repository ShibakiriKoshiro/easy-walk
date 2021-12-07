import { doc, setDoc } from '@firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import TextLink from '../components/TextLink';
import { auth, db } from '../libs/firebase';

type Inputs = {
  name: string;
  id: string;
  email: string;
  password: string;
};

const Signup: FC = () => {
  const router = useRouter();
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     user && router.push('/');
  //   });
  // }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data) => console.log(data);

  const createUser = async (data, e) => {
    const email = data.email;
    const password = data.password;
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        try {
          const docRef = await setDoc(doc(db, 'users', auth.currentUser.uid), {
            uid: auth.currentUser.uid,
            id: data.id,
            name: data.name,
            email: email,
            createdAt: auth.currentUser.metadata.creationTime,
          });
        } catch (e) {
          console.error('Error adding document: ', e);
        }

        // Signed in
        const user = userCredential.user;
        // ...
        router.push('/signin');
      })
      .catch((err) => {
        alert(err.message);
        // ..
      });
  };

  return (
    <div className="container w-full">
      <div className="w-full">
        <p className="text-center pt-8 font-bold text-lg">サインアップ</p>
        <form onSubmit={handleSubmit(createUser)}>
          <input
            placeholder="ユーザーID　※半角英字のみ"
            className="block mx-auto p-1 mt-6 border-gray-300 border-2 rounded w-1/2"
            defaultValue=""
            {...register('id')}
          />
          <input
            placeholder="ユーザー名"
            className="block mx-auto p-1 mt-6 border-gray-300 border-2 rounded w-1/2"
            defaultValue=""
            {...register('name')}
          />
          <input
            placeholder="メールアドレス"
            className="block mx-auto p-1 mt-6 border-gray-300 border-2 rounded w-1/2"
            {...register('email', { required: true })}
          />
          <input
            placeholder="パスワード"
            className="block mx-auto p-1 mt-6 border-gray-300 border-2 rounded w-1/2"
            {...register('password', { required: true })}
          />
          {errors.password && (
            <p className="text-center pt-3 text-yellow-600 text-base">
              This field is required
            </p>
          )}
          <button
            className="block mx-auto mt-6 px-8 py-2 bg-blue-600 shadow rounded text-white font-bold"
            type="submit"
          >
            登録
          </button>
        </form>
      </div>

      <div className="w-full text-center grid gap-8 mx-auto max-w-md">
        <p className="text-center pt-16 font-bold text-lg">
          SNSアカウントで登録
        </p>
        <Button theme="facebook">Facebookでアカウントを作成</Button>
        <Button theme="google">Googleでアカウントを作成</Button>
        <Button theme="twitter">Twitterでアカウントを作成</Button>
        <TextLink>ログインはこちら</TextLink>
      </div>
    </div>
  );
};

export default Signup;
