import React from 'react';
import StampCard from '../components/StampCard';

const Stamp = () => {
  return (
    <div className="">
      {/* <Heading /> */}
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
