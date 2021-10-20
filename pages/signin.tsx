import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import { auth } from '../libs/firebase';
import { useAuth } from '../libs/userContext';

type Inputs = {
  email: string;
  password: string;
};

const Signin: FC = () => {
  // 箱の中身を取り出している
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && router.push('/');
    });
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');

  const logIn = async (data, e) => {
    const email = data.email;
    const password = data.password;
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // ...
        router.push('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="container w-full">
      <div className="w-full">
        <p className="text-center pt-8 font-bold text-lg">サインイン</p>
        <form onSubmit={handleSubmit(logIn)}>
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
            className="block mx-auto mt-6 px-8 py-2 bg-blue-600 hover:bg-indigo-600 shadow rounded text-white font-bold"
            type="submit"
          >
            ログイン
          </button>
        </form>
      </div>

      <div className="w-full text-center grid gap-8 mx-auto max-w-md">
        <p className="text-center pt-16 font-bold text-lg">
          SNSアカウントでログイン
        </p>
        <Button theme="facebook">Facebook</Button>
        <Button theme="google">Google</Button>
        <Button theme="twitter">Twitter</Button>
        <Link href="/signup">
          <a className="text-blue-600 font-bold">登録はこちら</a>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
