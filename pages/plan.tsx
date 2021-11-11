import { BeakerIcon, NewspaperIcon } from '@heroicons/react/solid';
import React from 'react';
import Heading from '../components/Heading';
import TextLink from '../components/TextLink';
import Tiptap from '../components/Tiptap';

const Plan = () => {
  return (
    <div>
      <Heading>
        <BeakerIcon className="h-6 w-6 mr-6" />
        <p className="text-xl font-bold">見出しです！</p>
      </Heading>
      <div className="container ">
        <p className="text-lg mt-12">月額課金</p>
        <div className="sm:grid sm:grid-cols-2 gap-4 mt-3 mb-2">
          <a>
            <div className="w-full px-2 py-4 rounded hover:shadowrounded border border-gray-300 hover:border-0 hover:bg-red-100 hover:shadow">
              <div className="flex items-center">
                <div className="w-3/4">
                  <p className="font-bold">プレミアムプラン</p>
                  <p className="text-gray-600">観光に関する質問し放題。</p>
                </div>
                <div className="order-first sm:order-last w-1/4">
                  <NewspaperIcon className="h-16 w-16 sm:h-12 sm:w-12" />
                </div>
              </div>
              <div className="w-3/4 ml-auto sm:w-1/4 mt-3">
                <p className="font-semibold text-lg">100円/月</p>
              </div>
            </div>
          </a>
        </div>
        <TextLink>使用方法、注意事項等はこちら</TextLink>

        <p className="text-lg mt-12">イベント</p>
        <div className="sm:grid sm:grid-cols-2 gap-4 mt-3 mb-2">
          <a>
            <div className="w-full px-2 py-4 rounded hover:shadowrounded border border-gray-300 hover:border-0 hover:bg-red-100 hover:shadow">
              <div className="flex items-center">
                <div className="w-3/4">
                  <p className="font-bold">バルチケット</p>
                  <p className="text-gray-600">3枚つづりのバルチケットです。</p>
                </div>
                <div className="order-first sm:order-last w-1/4">
                  <NewspaperIcon className="h-16 w-16 sm:h-12 sm:w-12" />
                </div>
              </div>
              <div className="w-3/4 ml-auto sm:w-1/4 mt-3">
                <p className="font-semibold text-lg">100円/月</p>
              </div>
            </div>
          </a>
        </div>
        <TextLink>使用方法、注意事項等はこちら</TextLink>
      </div>
    </div>
  );
};

export default Plan;
