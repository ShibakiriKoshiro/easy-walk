const path = require('path');
module.exports = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    apiKey: 'AIzaSyDtfwuNpGIdO1bwj4y59FvqWOi56z78dsQ',
    authDomain: 'easy-walk-1c26a.firebaseapp.com',
    projectId: 'easy-walk-1c26a',
    storageBucket: 'easy-walk-1c26a.appspot.com',
    messagingSenderId: '1026579465074',
    appId: '1:1026579465074:web:8593904537c4a83a4593eb',
  },
  reactStrictMode: true,
};
