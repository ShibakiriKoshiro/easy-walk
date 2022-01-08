import { updateEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../libs/firebase';
import { useForm } from 'react-hook-form';
import router from 'next/router';
type Inputs = {
  email: string;
};

const ChangeEmail = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [email, setEmail] = useState('');

  // メールアドレス変更
  const changeEmail = (data: { email: string }) => {
    updateEmail(auth.currentUser, data.email)
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };
  return (
    <div>
      <div className="">
        <form onSubmit={handleSubmit(changeEmail)}>
          <input
            {...register('email')}
            placeholder="メールアドレス"
            className="block p-1 mt-6 border-gray-300 border-b-2 w-full outline-none"
          />
          <button
            className="block ml-auto mt-6 px-8 py-2 bg-blue-600 hover:bg-indigo-600 shadow rounded text-white font-bold"
            type="submit"
          >
            更新
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeEmail;
