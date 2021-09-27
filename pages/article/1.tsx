import {
  FlagIcon,
  QuestionMarkCircleIcon,
  ShareIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Article = () => {
  return (
    <div className="container mt-16">
      <div className="block lg:flex">
        <div className="w-full lg:w-2/12"></div>
        <article className="w-full lg:w-6/12">
          <div className="mx-auto">
            <Image
              src="/images/village.png"
              layout="responsive"
              width={700}
              height={475}
              alt="photo"
            />
          </div>
          <div className="flex items-center">
            <h1 className="text-4xl mt-3">Hello Title h1</h1>
            <button className="ml-auto">
              <ThumbUpIcon
                className="h-10 w-10"
                fill="none"
                stroke="currentColor"
              />
            </button>
          </div>
          <div className="flex mt-6 mb-3 pb-2 border-b border-blue-gray-300 ">
            <a href="#">
              <div className="flex">
                <QuestionMarkCircleIcon
                  className="h-6 w-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                />
                <p>質問する</p>
              </div>
            </a>
            <button className="ml-12">
              <div className="flex">
                <FlagIcon
                  className="h-6 w-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                />
                <p>足跡</p>
              </div>
            </button>
            <a href="#" className="ml-12">
              <div className="flex">
                <ShareIcon
                  className="h-6 w-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                />
                <p>共有</p>
              </div>
            </a>
          </div>
          <Link href="#">
            <a>
              <div className="flex items-center">
                <Image
                  src="/images/village.png"
                  width={64}
                  height={64}
                  alt="photo"
                  className="rounded-full"
                />
                <div className="ml-3">
                  <p className="font-bold text-xl">ユーザー名</p>
                  <p className="text-md text-gray-400">2021/9/28</p>
                </div>
              </div>
            </a>
          </Link>
        </article>
        <div className="w-full lg:w-1/12"></div>
        <div className="w-full ml-auto lg:w-3/12">
          <div className="">
            <Image
              src="/images/village.png"
              layout="responsive"
              width={700}
              height={475}
              alt="photo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
