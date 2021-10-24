import { CameraIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import Heading from '../components/Heading';

type Inputs = {
  userName: string;
  profile: string;
  link: URL;
};

const Mypage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="pt-8 pb-16">
      <div className="container">
        <p className="font-bold">プロフィール</p>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mt-6 flex">
                <span className="inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <label
                  htmlFor="avater"
                  className="h-full mt-auto -ml-6 cursor-pointer"
                >
                  <input id="avater" type="file" className="hidden" />
                  <CameraIcon
                    className="h-10 w-10"
                    fill="none"
                    stroke="currentColor"
                  />
                </label>
              </div>
            </div>
            <input
              placeholder="ユーザー名"
              className="block p-1 mt-6 border-gray-300 border-b-2 w-full outline-none"
              {...register('userName', { required: true })}
            />
            <input
              placeholder="プロフィール"
              className="block p-1 mt-6 border-gray-300 border-b-2 w-full outline-none"
              {...register('profile', { required: true })}
            />
            <input
              placeholder="リンク"
              className="block p-1 mt-6 border-gray-300 border-b-2 w-full outline-none"
              {...register('link', { required: true })}
            />
            {errors.link && (
              <p className="text-center pt-3 text-yellow-600 text-base">
                This field is required
              </p>
            )}
            <button
              className="block ml-auto mt-6 px-8 py-2 bg-blue-600 hover:bg-indigo-600 shadow rounded text-white font-bold"
              type="submit"
            >
              更新
            </button>
          </form>
        </div>
        <p className="font-bold mt-12 mb-6">プラン</p>
        <div className="flex">
          <p className="mr-20 text-lg">フリープラン</p>
          <Link href="/plan">
            <a className="text-blue-600 text-lg">プラン変更</a>
          </Link>
        </div>
        <p className="text-gray-600 mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p className="font-bold mt-12 mb-6">退会</p>
        <p className="text-gray-600 mt-3">
          ユーザー名を入力すると退会することが出来ます。
        </p>
        <p className="text-gray-600">
          退会すると、利用データが消去され復元することが出来ません。
        </p>
        <p className="text-gray-600">
          有料プランに加入している場合、退会すると全ての定期購入が停止します。
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="ユーザー名"
            className="block p-1 mt-6 border-gray-300 border-b-2 w-full outline-none"
            {...register('userName', { required: true })}
          />
          <button
            className="block ml-auto mt-6 px-8 py-2 bg-red-600 hover:bg-red-700 shadow rounded text-white font-bold"
            type="submit"
          >
            退会
          </button>
        </form>
      </div>
    </div>
  );
};

export default Mypage;
