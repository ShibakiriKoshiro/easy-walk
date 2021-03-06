import {
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import { auth, db } from '../libs/firebase';
import { useAuth } from '../libs/userContext';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FacebookAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { sendPasswordResetEmail } from 'firebase/auth';

type Inputs = {
  email: string;
  password: string;
};

const Signin: FC = () => {
  // 箱の中身を取り出している
  const { user } = useAuth();
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

  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');

  const logIn = async (data, e) => {
    const email = data.email;
    const password = data.password;
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        // ...
        router.push('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // Googleログイン
  const provider = new GoogleAuthProvider();
  const loginGoolgle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        try {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = await GoogleAuthProvider.credentialFromResult(
            result
          );
          // const token = await credential?.accessToken;
          // The signed-in user info.
          const user = result.user;
          const userDoc = doc(db, `users/${user.uid}`);
          // ユーザードキュメントにユーザーidのみ反映
          // おそらく反映するより前にコンテクストが走ってnullになっている
          await getDoc(userDoc).then(async (result) => {
            const userData = await result?.data();
            console.log(userData, 'userData');
            if (!userData) {
              console.log('ドキュメント反映', user.uid);
              await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
              }).then(() => {
                router.push('/register');
              });
              console.log('userにセットしたよ', user.uid);
            }
            if (userData?.uid && userData?.id && userData?.name) {
              router.push('/');
            }
            if ((userData?.uid && !userData?.id) || !userData?.name) {
              router.push('/register');
            }
          });
          // console.log({ credential, token, user });
        } catch {
          console.log('error');
        }

        // await getDoc(userDoc).then((result) => {
        //   const userData = result?.data();
        //   if (userData?.id && userData?.name) {
        //     router.push('/');
        //   } else {
        //     router.push('/register');
        //   }
        // });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log({ errorCode, errorMessage, email, credential });
      });
  };

  // Facebookログイン
  const facebookProvider = new FacebookAuthProvider();
  const loginFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then(async (result) => {
        try {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const accessToken = credential.accessToken;
          const user = result.user;
          const userDoc = doc(db, `users/${user.uid}`);
          // ユーザードキュメントにユーザーidのみ反映
          // おそらく反映するより前にコンテクストが走ってnullになっている
          await getDoc(userDoc).then(async (result) => {
            const userData = await result?.data();
            console.log(userData, 'userData');
            if (!userData) {
              console.log('ドキュメント反映', user.uid);
              await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
              }).then(() => {
                router.push('/register');
              });
              console.log('userにセットしたよ', user.uid);
            }
            if (userData?.uid && userData?.id && userData?.name) {
              router.push('/');
            }
            if ((userData?.uid && !userData?.id) || !userData?.name) {
              router.push('/register');
            }
          });
          // console.log({ credential, token, user });
        } catch {
          console.log('error');
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
      });
  };

  //　パスワード忘れ(本来は別ページで！)
  const auth = getAuth();
  const changePass = () => {
    sendPasswordResetEmail(auth, 'olive070719@gmail.com')
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  //メール認証
  //本来はサイト全体で行う。context
  const checkEmail = () => {
    if (!auth.currentUser.emailVerified) {
      sendEmailVerification(auth.currentUser).then(() => {
        // Email verification sent!
        // ...
      });
    }
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
        <button
          onClick={loginGoolgle}
          className="px-6 py-2 rounded-full inline-block bg-red-500 text-white font-bold"
        >
          Google
        </button>
        <button
          onClick={loginFacebook}
          className="px-6 py-2 rounded-full inline-block bg-blue-600 text-white font-bold"
        >
          Facebook
        </button>
        <Button theme="twitter">Twitter</Button>
        <Link href="/signup">
          <a className="text-blue-600 font-bold">登録はこちら</a>
        </Link>
      </div>
      <button onClick={changePass}>パス忘れた</button>
      <div></div>
      <button onClick={checkEmail}>メール認証する</button>
    </div>
  );
};

export default Signin;
