import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
// const getFunctions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp();

const serviceAccount = require('../firebase-admin.json');

if (!getApps()?.length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

// // functions リージョンは大阪
// export const functions = getFunctions('asia-northeast2');

export const adminDB = getFirestore();
