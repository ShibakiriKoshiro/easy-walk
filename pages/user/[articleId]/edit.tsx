/* eslint-disable @next/next/no-img-element */
import { BeakerIcon, CameraIcon } from '@heroicons/react/solid';
import loadImage from 'blueimp-load-image';
import parse from 'html-react-parser';
import dynamic from 'next/dynamic';
import React, { FormEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Heading from '../../../components/Heading';
import Tiptap from '../../../components/Tiptap';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useAuth } from '../../../libs/userContext';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { db, storage } from '../../../libs/firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Modal from 'react-modal';
import styles from '../../../styles/Modal.module.css';
import Image from '@tiptap/extension-image';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { adminDB } from '../../../libs/firebase-admin';

type Inputs = {
  title: string;
  description: string;
  category: string;
  status: 'public' | 'private';
};

export default function Home() {
  const router = useRouter();
  const { articleId } = router.query;
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data) => {
    const status = data.status;
    const category = data.category;
    const title = data.title;
    const description = data.description;
    const articleDoc = doc(
      db,
      // 本来は動的に記事idを取得
      `articles/${articleId}`
    );

    setDoc(
      articleDoc,
      {
        status,
        category,
        title,
        description,
      },
      {
        merge: true,
      }
    ).then(() => {
      alert('保存完了');
    });
  };

  const [title, setTitle] = useState('');
  const handleTitle = (event) => {
    console.log(title);
    setTitle(event.target.value);
  };
  const [description, setDescription] = useState('');
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const categories = ['観光', '特産品', '体験'];
  const [body, setBody] = useState();

  //　記事idを取得後記事の中身をセット
  useEffect(() => {
    if (!articleId) {
      return;
    }

    const defaultDoc = doc(
      db,
      // 本来はarticleIdが入ってから取得
      `articles/${articleId}`
    );
    console.log(articleId, 'articleId');

    getDoc(defaultDoc).then((result) => {
      const articleData = result.data();
      console.log(articleData, '記事データ');
      if (articleData) {
        const defaultPhoto = articleData.thumbnail;
        const defaultTitle = articleData.title;
        const defaultDescription = articleData.description;
        const defaultBody = articleData.body;

        if (defaultBody) {
          setBody(defaultBody);
          console.log(defaultBody);
        }
        if (defaultDescription) {
          setDescription(defaultDescription);
        }
        if (defaultTitle) {
          setTitle(defaultTitle);
        }
        if (defaultPhoto) {
          setPreview(defaultPhoto);
        }
      }
    });
    // 第二引数は、ロードする条件指定
  }, [articleId]);
  // プレビュー画像を管理
  const [preview, setPreview] = useState<string>();

  // クロッパーを管理
  const [cropper, setCropper] = useState<Cropper | null>();

  // クロップ対象のファイルを管理
  const [targetFile, setTargetFile] = useState<Blob | null>();

  // アップロードボタン
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
        aspectRatio: 16 / 9,
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
    // 保存先のRefを取得
    const storageRef = ref(
      storage,
      // 本来はarticleIdを動的に取得
      `articles/${articleId}/thumbnail.jpg`
    );

    // 画像アップロード
    await uploadString(storageRef, preview as string, 'data_url');

    // アップロードした画像を表示するためのURLを取得
    const thumbnail = await getDownloadURL(storageRef);

    // ユーザードキュメントに反映
    // 本来はarticleIdを動的に取得
    const photoDoc = doc(db, `articles/${articleId}`);

    setDoc(
      photoDoc,
      {
        thumbnail,
      },
      {
        merge: true,
      }
    ).then(() => {
      SetUploadImage(false);
      alert('保存完了');
    });
  };
  const aid = () => {
    const newCityRef = doc(collection(db, 'cities'));
    console.log(newCityRef.id);
  };

  return (
    <>
      <Heading>
        <BeakerIcon className="h-6 w-6 mr-6" />
        <p className="text-xl font-bold">見出しです！</p>
      </Heading>
      <div className="container pt-8 pb-16">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
              <label
                htmlFor="country"
                className="text-base text-right block font-medium text-gray-700"
              >
                記事の状態
              </label>
              <select
                id="country"
                name="country"
                autoComplete="country"
                className="text-lg font-bold ml-auto mt-1 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                {...register('status', { required: true })}
              >
                <option value="public">公開</option>
                <option value="private">非公開</option>
              </select>
              <div className="w-full mt-6">
                <label
                  htmlFor="country"
                  className="text-right text-base block font-medium text-gray-700"
                >
                  カテゴリー
                </label>
                <select
                  id="country"
                  name="country"
                  autoComplete="country"
                  className="ml-auto text-lg font-bold mt-1 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  {...register('category', { required: true })}
                >
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            <input
              placeholder="タイトル"
              className="block p-1 mt-6 border-gray-300 border-b-2 w-full outline-none"
              {...register('title', { required: true })}
              onChange={(event) => handleTitle(event)}
              type={'text'}
              value={title}
            />
            <p className="text-right">{title.length} /32文字</p>
            <textarea
              placeholder="ディスクリプション"
              className="block p-1 mt-6 border-gray-300 border-b-2 w-full outline-none"
              {...register('description', { required: true })}
              onChange={(event) => handleDescription(event)}
              value={description}
            />
            <p className="text-right">{description.length} /120文字</p>
            <div className="mt-6 flex">
              <div className="mt-6 flex">
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="h-36 w-64 overflow-hidden border block"
                    src={preview}
                    alt=""
                  />
                ) : (
                  <div className="h-36 w-64 overflow-hidden border bg-gray-400"></div>
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
                    className="h-10 w-10 mt-12"
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
                          width: 960, // リサイズ
                          height: 540, // リサイズ
                        })
                        .toDataURL('image/jpeg');
                      // プレビューステートにセット
                      setPreview(croppedImage);
                      // ダイヤログを閉じるためにクロップターゲットを空にする
                      setTargetFile(null);
                      SetUploadImage(true);
                    }}
                  >
                    適用
                  </button>
                </div>
              </Modal>
            </div>
            <div className="mt-6 ">
              <Tiptap content={body} />
            </div>
            <div className="block lg:flex mt-6">
              <button className="mr-auto mt-3 block px-8 py-2 bg-red-600 hover:bg-pink-600 shadow rounded text-white font-bold">
                削除
              </button>
              <button
                className="mt-3 ml-auto block px-8 py-2 bg-blue-600 hover:bg-indigo-600 shadow rounded text-white font-bold"
                type="submit"
              >
                更新
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
