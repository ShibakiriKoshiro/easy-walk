import Image from 'next/image';
import React from 'react';
import ArticleCard from '../../components/ArticleCard';

const About = () => {
  return (
    <div className="container mt-16">
      <div className="flex items-center">
        <Image
          src="/images/village.png"
          width={128}
          height={128}
          alt="photo"
          className="rounded-full"
        />
        <div className="ml-6">
          <p className="font-bold text-2xl">ユーザー名</p>
          <a href="#" className="text-sm text-blue-600">
            https://tailwindui.com/components/application-ui/headings/card-headings
          </a>
        </div>
      </div>
      <div className="border-b border-blue-gray-300 mt-3 py-1">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className="mt-6">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          <ArticleCard
            title="タイトル"
            href="/article/1"
            user="ユーザー名"
            date="2021-10-10"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
