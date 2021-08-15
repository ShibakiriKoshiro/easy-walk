import { LockClosedIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ArticleCard = () => {
  return (
    <div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 container">
        <Link href="/article">
          <a>
            <div className="shadow rounded-lg my-20">
              <div className="h-40 relative">
                <Image
                  src="/images/village.png"
                  alt="photo"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-2">
                <p className="text-lg font-medium hover:underline">
                  タイトルです。タイトルです。タイトルです。
                </p>
                <Link href="/user">
                  <a>
                    <div className="flex items-center">
                      <div className="mt-2">
                        <Image
                          src="/images/village.png"
                          alt="photo"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                      <p className="text-base pl-2">ユーザー名</p>
                    </div>
                  </a>
                </Link>
                <div className="flex items-center">
                  <p className="text-base text-gray-400">2021/8/15</p>
                  <LockClosedIcon
                    className="h-6 w-6 ml-auto"
                    fill="none"
                    stroke="currentColor"
                  />
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
