import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = require('../firebase-admin.json');

if (!getApps()?.length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const adminDB = getFirestore();
