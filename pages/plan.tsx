import { PlusIcon } from '@heroicons/react/solid';
import React from 'react';
import Heading from '../components/Heading';
import TextLink from '../components/TextLink';

const Plan = () => {
  return (
    <div>
      <Heading />
      <div className="container">
        <p className="text-lg mt-12">月額課金</p>
        <div className="sm:grid sm:grid-cols-2  xl:grid-cols-3 gap-4 mt-3 mb-2">
          <a>
            <div className="block sm:flex w-full px-2 py-4 rounded hover:shadowrounded border border-gray-300 hover:border-0 hover:bg-red-100 hover:shadow">
              <div className="w-full sm:w-3/4">
                <p className="font-bold">プレミアムプラン</p>
                <p className="mt-2 text-gray-600">観光に関する質問し放題。</p>
              </div>
              <div className="w-full sm:w-1/4">
                <div className="flex sm:block items-center">
                  <div className="w-1/2 sm:w-full">
                    <PlusIcon className="h-12 w-12" />
                  </div>
                  <div className="w-1/2 sm:w-full">
                    <p className="mt-6 font-bold inline">100円/月</p>
                  </div>
                </div>
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
