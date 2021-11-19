import { BeakerIcon, PencilIcon } from '@heroicons/react/solid';
import React from 'react';
import Heading from '../../components/Heading';
import { useRouter } from 'next/router';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../libs/firebase';
import Dashboard from '../../components/dashboard';
const Management = () => {
  const router = useRouter();
  const toEditPage = () => {
    const { id } = doc(collection(db, 'articles'));
    router.push(`/user/${id}/edit`);
  };
  return (
    <div>
      <Heading>
        <BeakerIcon className="h-6 w-6 mr-6" />
        <p className="text-xl font-bold">見出しです！</p>
      </Heading>
      <div className="container">
        <Dashboard select={true} />
        <div className="w-full text-right my-3">
          <button
            onClick={toEditPage}
            className="rounded p-2 bg-blue-500 shadow text-white"
          >
            投稿する
          </button>
        </div>
        <div className="border-b border-blue-gray-300">
          <div className="flex">
            <a className="font-bold hover:underline text-xl">タイトルです。</a>
            <a href="#" className="block ml-auto">
              <PencilIcon className="h-6 w-6" />
            </a>
          </div>
          <div className="flex items-center my-2">
            <div className="">
              <p className="inline border-blue-600 text-blue-600 rounded border px-2 py-1 mr-3">
                公開
              </p>
              <p className="inline text-gray-400">2021/9/28に公開</p>
            </div>
            <div className="ml-auto">
              <p>1200文字</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Management;
