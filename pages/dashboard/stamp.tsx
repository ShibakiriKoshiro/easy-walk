import { BeakerIcon } from '@heroicons/react/solid';
import React from 'react';
import Dashboard from '../../components/dashboard';
import Heading from '../../components/Heading';
import StampCard from '../../components/StampCard';

const Stamp = () => {
  return (
    <div className="w-full">
      <div className="container">
        <Dashboard>
          <div className="mt-6">
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
        </Dashboard>
      </div>
    </div>
  );
};

export default Stamp;
