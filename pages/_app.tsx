import React from 'react';
import 'react-quill/dist/quill.snow.css';
import 'tailwindcss/tailwind.css';
import Layout from '../components/Layout';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
