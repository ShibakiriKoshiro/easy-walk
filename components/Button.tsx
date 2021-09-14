import React from 'react';

const Button = ({ children, theme = 'primary' }) => {
  let themeColor: string;
  switch (theme) {
    case 'primary':
      themeColor = 'bg-yellow-500';
      break;
    case 'google':
      themeColor = 'bg-red-600 text-white';
      break;
    case 'facebook':
      themeColor = 'bg-blue-600 text-white';
      break;
    case 'twitter':
      themeColor = 'bg-blue-400 text-white';
      break;
  }

  const classSet = [
    'px-6 py-2 rounded-full inline-block',
    themeColor,
    theme ? 'font-bold' : 'border',
    theme && theme !== 'primary',
  ]
    .filter(Boolean)
    .join(' ');
  return <button className={classSet}>{children}</button>;
};

export default Button;
