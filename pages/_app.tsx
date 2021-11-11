import type { AppProps } from 'next/app';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import 'tailwindcss/tailwind.css';
import Layout from '../components/Layout';
import { AuthProvider } from '../libs/userContext';
import '../styles/tiptap.module.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;
