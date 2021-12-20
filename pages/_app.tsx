import type { AppProps } from 'next/app';
import React from 'react';
import 'tailwindcss/tailwind.css';
import Layout from '../components/Layout';
import { AuthProvider } from '../libs/userContext';
import NextNProgress from 'nextjs-progressbar';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Layout>
        <NextNProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;
