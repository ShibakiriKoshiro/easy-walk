import { auth, db } from '../libs/firebase';
import { sendEmailVerification } from 'firebase/auth';
import React from 'react';
import router from 'next/router';

const CheckEmail = () => {
  //メール認証
  //本来はサイト全体で行う。context
  const checkEmail = () => {
    if (!auth.currentUser.emailVerified) {
      sendEmailVerification(auth.currentUser).then(() => {});
    }
  };

  return (
    <div>
      <p>メールアドレスの認証を行って下さい。</p>
      <button onClick={checkEmail}>今すぐ確認する</button>
    </div>
  );
};

export default CheckEmail;
