import React from 'react';
import 'tailwindcss/tailwind.css';
import Layouts from '../components/Layouts';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Layouts>
        <Component {...pageProps} />
      </Layouts>
    </>
  );
};

export default MyApp;
