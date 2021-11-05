/* eslint-disable @next/next/no-img-element */
import { CameraIcon, PhotographIcon } from '@heroicons/react/solid';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { db, storage } from '../libs/firebase';
import { useAuth } from '../libs/userContext';

type Inputs = {
  userName: string;
  profile: string;
  link: URL;
};

const Mypage = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    const userDoc = doc(db, `users/FnBNsBdPztUlfSz0Dq5UBK3H5XD3`);

    getDoc(userDoc).then((result) => {
      const userData = result.data();
      const photo = userData?.avatarUrl;
      if (photo) {
        setPreview(photo);
      }
    });
  }, []);
  // プレビュー画像を管理
  const [preview, setPreview] = useState<string>();

  // クロッパーを管理
  const [cropper, setCropper] = useState<Cropper | null>();

  // クロップ対象のファイルを管理
  const [targetFile, setTargetFile] = useState<Blob | null>();

  // クロップ対象の画像をセット
  const setImageToCropper = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetFile(event?.target.files?.[0] as Blob);
    event.target.value = '';
  };
  // クロッパーの初期化（モーダル起動後に発動）
  const initCropper = () => {
    // イメージタグを捕捉
    const image: HTMLImageElement = document.getElementById(
      'image'
    ) as HTMLImageElement;

    // 選択された画像ファイルを文字列に変換するために必要なリーダー
    const reader = new FileReader();

    // 画像ファイル読み込み時に発動する処理
    reader.onload = (event) => {
      // 文字列として読み込んだ画像をイメージタグにセット
      image.src = event?.target?.result as string;

      // クロッパーの初期化
      const wrapper = new Cropper(image, {
        aspectRatio: 1 / 1,
        cropBoxResizable: false,
        cropBoxMovable: false,
        dragMode: 'move',
        viewMode: 3,
      });

      // クロッパーをステートに保持させる
      setCropper(wrapper);
    };

    // リーダーに画像ファイルを渡す
    reader.readAsDataURL(targetFile as Blob);
  };

  // プレビューされている内容をアップロード
  const uploadAvatar = async () => {
    // 保存先のRefを取得
    const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);

    // 画像アップロード
    await uploadString(storageRef, preview as string, 'data_url');

    // アップロードした画像を表示するためのURLを取得
    const avatarUrl = await getDownloadURL(storageRef);

    // ユーザードキュメントに反映
    const userDoc = doc(db, `users/${user.uid}`);

    setDoc(
      userDoc,
      {
        avatarUrl,
      },
      {
        merge: true,
      }
    ).then(() => {
      alert('アップロード完了');
    });
  };

  return (
    <div className="pt-8 pb-16">
      <div className="container">
        <p className="font-bold">プロフィール</p>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <label className="inline-block mb-4 cursor-pointer relative">
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="w-20 h-20 rounded-full overflow-hidden border block"
                    src={preview}
                    alt=""
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full overflow-hidden border bg-gray-400"></div>
                )}

                <input
                  className="hidden"
                  type="file"
                  onChange={setImageToCropper}
                />
                <PhotographIcon className="absolute left-1/2 top-1/2 transform opacity-60 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-white" />
              </label>
            </div>
            <Modal
              isOpen={!!targetFile}
              onAfterOpen={initCropper}
              onRequestClose={() => setTargetFile(null)}
              contentLabel="Example Modal"
            >
              <h2 className="font-bold text-2xl mb-6">クロップ</h2>

              <div className="max-w-sm pb-4 border-b mb-4">
                <img id="image" className="block w-full" alt="" />
              </div>

              <button
                className="px-4 py-3 shadow rounded bg-gray-700 text-white"
                onClick={() => {
                  // プレビューステートにクロッピング結果を格納
                  const croppedImage = cropper
                    ?.getCroppedCanvas({
                      width: 300, // リサイズ
                      height: 300, // リサイズ
                    })
                    .toDataURL('image/jpeg');

                  // プレビューステートにセット
                  setPreview(croppedImage);

                  // ダイヤログを閉じるためにクロップターゲットを空にする
                  setTargetFile(null);
                }}
              >
                クロップする
              </button>
            </Modal>
            <div className="mt-10">
              <button
                className="px-4 py-3 shadow rounded bg-gray-700 text-white"
                onClick={uploadAvatar}
              >
                アップロード
              </button>
            </div>
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
                  htmlFor="avatar"
                  className="h-full mt-auto -ml-6 cursor-pointer"
                >
                  <input id="avatar" type="file" className="hidden" />
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
