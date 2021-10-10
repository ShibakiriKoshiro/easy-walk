import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  // dev環境Firebase
  dev: {
    apiKey: 'AIzaSyDtfwuNpGIdO1bwj4y59FvqWOi56z78dsQ',
    authDomain: 'easy-walk-1c26a.firebaseapp.com',
    projectId: 'easy-walk-1c26a',
    storageBucket: 'easy-walk-1c26a.appspot.com',
    messagingSenderId: '1026579465074',
    appId: '1:1026579465074:web:8593904537c4a83a4593eb',
  },
  // 本番
  prod: {
    apiKey: 'AIzaSyDtfwuNpGIdO1bwj4y59FvqWOi56z78dsQ',
    authDomain: 'easy-walk-1c26a.firebaseapp.com',
    projectId: 'easy-walk-1c26a',
    storageBucket: 'easy-walk-1c26a.appspot.com',
    messagingSenderId: '1026579465074',
    appId: '1:1026579465074:web:8593904537c4a83a4593eb',
  },
};

const app = initializeApp(firebaseConfig.dev);

// auth
export const auth = getAuth();

// firestore
export const db = getFirestore();

// functions リージョンは大阪
export const functions = getFunctions(app, 'asia-northeast2');
