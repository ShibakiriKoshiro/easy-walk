import React from 'react';

const Heading = ({ children }) => {
  return (
    <div className="py-6 container">
      <div className="flex items-center">{children}</div>
    </div>
  );
};

export default Heading;
