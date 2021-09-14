import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <div>
      <div className="relative top-0 lg:h-screen flex items-center">
        <div className="bg-hero-pattern h-screen opacity-80">
          <Image
            src="/images/village.png"
            alt="photo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative container text-right">
          <p className="text-white text-6xl font-bold lg:leading-relaxed mt-60">
            はじめての街を、
          </p>
          <p className="text-white text-6xl font-bold lg:leading-relaxed mb-12">
            歩きやすく
          </p>
          <Link href="/login">
            <a className="font-bold py-2 px-10 text-4xl shadow-lg bg-blue-600 text-white rounded-lg">
              はじめる
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Hero;
