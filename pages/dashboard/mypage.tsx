/* eslint-disable @next/next/no-img-element */
import { CameraIcon } from '@heroicons/react/solid';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { db, storage } from '../../libs/firebase';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from 'firebase/storage';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../libs/userContext';
import styles from '../../styles/Modal.module.css';
import Modal from 'react-modal';
import Dashboard from '../../components/dashboard';
import { deleteUser, getAuth } from 'firebase/auth';
type Inputs = {
  userName: string;
  description: string;
  link: URL;
};

const Mypage = () => {
  const { user } = useAuth();
  const auth = getAuth();
  const authUser = auth.currentUser;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleLink = (event) => {
    setLink(event.target.value);
  };

  //　ユーザーが入ってから実行
  useEffect(() => {
    if (user?.uid) {
      const userDoc = doc(db, `users/${user.uid}`);
      getDoc(userDoc).then((result) => {
        const userData = result.data();
        const defaultPhoto = userData?.avatarUrl;
        const defaultName = userData?.name;
        const defaultDescription = userData?.description;
        const defaultLink = userData?.link;
        if (defaultName) {
          setName(defaultName);
        }
        if (defaultDescription) {
          setDescription(defaultDescription);
        }
        if (defaultLink) {
          setLink(defaultLink);
        }

        if (defaultPhoto) {
          setPreview(defaultPhoto);
        }
      });
    }
    // 第二引数は、ロードする条件指定
  }, [user?.uid]);
  // プレビュー画像を管理
  const [preview, setPreview] = useState<string>();

  // クロッパーを管理
  const [cropper, setCropper] = useState<Cropper | null>();

  // クロップ対象のファイルを管理
  const [targetFile, setTargetFile] = useState<Blob | null>();

  // アップロードボタン対象があるかないか
  const [uploadImage, SetUploadImage] = useState<boolean>(false);

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
        // cropBoxMovable: false,
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
    if (uploadImage) {
      // 保存先のRefを取得
      const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);

      // 画像アップロード
      await uploadString(storageRef, preview as string, 'data_url');

      // アップロードした画像を表示するためのURLを取得
      const avatarUrl = await getDownloadURL(storageRef);
      console.log(avatarUrl, 'avatarUrl');

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
        SetUploadImage(false);
        alert('保存完了');
      });
    }
  };

  const upload = async (data) => {
    const name = data.userName;
    const description = data.description;
    const link = data.link;

    const profileDoc = doc(
      db,
      // 本来は動的に記事idを取得
      `users/${user.uid}`
    );
    setDoc(
      profileDoc,
      {
        name,
        description,
        link,
      },
      {
        merge: true,
      }
    ).then(() => {
      SetUploadImage(false);
      alert('保存完了');
    });
  };
  const deleteU = () => {
    deleteUser(authUser)
      .then(async () => {
        console.log('消去');
        await deleteDoc(doc(db, 'users', user.uid));
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  };

  return (
    <Dashboard>
      <div className="mt-6">
        <form onSubmit={handleSubmit(upload)}>
          <div className="flex items-center">
            <div className="mt-6 flex">
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
              <label
                htmlFor="avatar"
                className="h-full mt-auto -ml-6 cursor-pointer"
              >
                <input
                  onChange={setImageToCropper}
                  id="avatar"
                  type="file"
                  className="hidden"
                />
                <CameraIcon
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                />
              </label>
              {uploadImage && (
                <div className="mt-10 ml-12">
                  <button
                    className="px-2 py-1 shadow-xl rounded bg-blue-700 text-white"
                    onClick={uploadAvatar}
                  >
                    アップロード
                  </button>
                </div>
              )}
            </div>
          </div>
          <Modal
            isOpen={!!targetFile}
            onAfterOpen={initCropper}
            onRequestClose={() => setTargetFile(null)}
            contentLabel="Example Modal"
            className={styles.modal}
            overlayClassName={styles.overlay}
          >
            <h2 className="font-bold text-2xl mb-6">画像を切り取る</h2>

            <div className="max-w-sm h-60 pb-4 border-b mb-4">
              <img id="image" className="block w-full" alt="" />
            </div>

            <div className="text-right w-full">
              <button
                className="px-4 py-3 shadow rounded bg-gray-700 text-white"
                type="submit"
                onClick={() => {
                  // プレビューステートにクロッピング結果を格納
                  const croppedImage = cropper
                    ?.getCroppedCanvas({
                      width: 256, // リサイズ
                      height: 256, // リサイズ
                    })
                    .toDataURL('image/jpeg');

                  // プレビューステートにセット

                  //　全部走り終わるまでsetされない
                  // 要修正
                  setPreview(croppedImage);

                  // アップロード対象
                  SetUploadImage(true);
                  // uploadAvatar(croppedImage);
                  // ダイヤログを閉じるためにクロップターゲットを空にする
                  setTargetFile(null);
                  SetUploadImage(true);
                }}
              >
                適用
              </button>
            </div>
          </Modal>
          <p className="block p-1 mt-6 border-gray-300 border-b-2 w-full outline-non">
            <span>{auth.currentUser?.email}</span>
          </p>
          <input
            placeholder="ユーザー名"
            className="block p-1 mt-6 border-gray-300 border-b-2 w-full outline-none"
            {...register('userName', { required: true })}
            value={name}
            onChange={(event) => handleName(event)}
          />
          <input
            placeholder="プロフィール"
            className="block p-1 mt-6 border-gray-300 border-b-2 w-full outline-none"
            {...register('description', { required: true })}
            value={description}
            onChange={(event) => handleDescription(event)}
          />
          <input
            placeholder="リンク"
            className="block p-1 mt-6 border-gray-300 border-b-2 w-full outline-none"
            {...register('link')}
            onChange={(event) => handleLink(event)}
            value={link}
          />
          {errors.link && (
            <p className="text-center pt-3 text-yellow-600 text-base">
              This field is required
            </p>
          )}
          <button
            className="block ml-auto mt-6 px-8 py-2 bg-blue-600 hover:bg-indigo-600 shadow rounded text-white font-bold"
            type="submit"
            onClick={uploadAvatar}
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
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
      <button
        onClick={deleteU}
        className="block ml-auto mt-6 px-8 py-2 bg-red-600 hover:bg-indigo-600 shadow rounded text-white font-bold"
      >
        退会する
      </button>
    </Dashboard>
  );
};

export default Mypage;
