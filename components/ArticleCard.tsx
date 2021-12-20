import { LockClosedIcon } from '@heroicons/react/solid';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { db } from '../libs/firebase';
import Date from './Date';
import ArticleType from '../types/article-type';

const ArticleCard: React.VFC<ArticleType> = ({
  title,
  href,
  user,
  date,
  thumbnail,
}) => {
  const [writer, setWriter] = useState<any>();

  useEffect(() => {
    if (user) {
      const ref = doc(db, `users/${user}`);
      getDoc(ref).then((snap) => {
        setWriter(snap.data() as any);
      });
    }
  }, []);

  return (
    <div className="flex flex-col">
      <Link href={href}>
        <a className="h-full flex flex-col">
          <div className="shadow rounded-lg flex flex-col flex-1">
            <div className="h-40 relative">
              <Image
                src={thumbnail}
                alt="photo"
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-2 flex flex-col flex-1">
              <p className="text-lg font-medium hover:underline flex-1">
                {title}
              </p>
              {writer && (
                <div className="flex items-center">
                  <div className="mt-2">
                    <Image
                      src={writer?.avatarUrl}
                      alt="photo"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </div>
                  <p className="text-base pl-2">{writer?.name}</p>
                </div>
              )}
              <div className="flex items-center">
                <p className="text-base text-gray-400">
                  <Date timestamp={date} />
                </p>
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
  );
};

export default ArticleCard;
