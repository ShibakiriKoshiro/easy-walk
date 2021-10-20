import type { NextPage } from 'next';
import React from 'react';
import Features from '../components/Features';
import Hero from '../components/Hero';

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
};
export default Home;
