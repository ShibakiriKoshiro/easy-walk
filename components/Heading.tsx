import React from 'react';

type HeadingProps = {
  heading: string;
  htmlElement?: keyof JSX.IntrinsicElements | '';
  heroIconName: string;
};

const Heading: React.VFC<HeadingProps> = ({
  heading,
  htmlElement = '',
  heroIconName,
}) => {
  const CustomTag = htmlElement !== '' ? htmlElement : { heroIconName };
  return (
    <div className="py-6 container">
      <div className="flex items-center">
        <CustomTag className="h-6 w-6 mr-6" />
        <p className="text-xl font-bold">{heading}</p>
      </div>
    </div>
  );
};

export default Heading;
