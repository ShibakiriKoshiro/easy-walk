import { BeakerIcon } from '@heroicons/react/solid';
import React from 'react';
import Heading from '../../components/Heading';
import StampCard from '../../components/StampCard';

const Stamp = () => {
  return (
    <div className="">
      <Heading>
        <BeakerIcon className="h-6 w-6 mr-6" />
        <p className="text-xl font-bold">見出しです！</p>
      </Heading>
      <div className="container">
        <p className="font-bold text-lg">お寺</p>
        <div className="mt-6 grid grid-cols-6 gap-4">
          <StampCard theme="complete">千光寺</StampCard>
          <StampCard theme="incomplete">千光寺</StampCard>
          <StampCard theme="incomplete">千光寺</StampCard>
          <StampCard theme="complete">千光寺</StampCard>
          <StampCard theme="complete">千光寺</StampCard>
          <StampCard theme="complete">千光寺</StampCard>
          <StampCard theme="complete">千光寺</StampCard>
        </div>
      </div>
    </div>
  );
};

export default Stamp;
