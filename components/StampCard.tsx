import React from 'react';

const StampCard = ({ children, theme = 'primary' }) => {
  let themeColor: string;
  switch (theme) {
    case 'complete':
      themeColor = 'bg-gray-100';
      break;
    case 'incomplete':
      themeColor = 'bg-red-200';
      break;
  }

  const classSet = [
    'px-6 py-2 rounded-md inline-block text-center shadow',
    themeColor,
    theme && theme !== 'primary',
  ]
    .filter(Boolean)
    .join(' ');
  return <a className={classSet}>{children}</a>;
};

export default StampCard;
