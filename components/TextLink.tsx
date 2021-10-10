import React from 'react';

const TextLink = ({ children }) => {
  const classSet = ['my-2 text-blue-600 hover:underline']
    .filter(Boolean)
    .join(' ');
  return (
    <a className={classSet} href="#">
      {}
    </a>
  );
};

export default TextLink;
