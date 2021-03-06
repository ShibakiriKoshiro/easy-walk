/* eslint-disable @next/next/no-img-element */
import { BeakerIcon, CameraIcon } from '@heroicons/react/solid';
import { JSONContent } from '@tiptap/react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import Heading from '../../../components/Heading';
import Tiptap from '../../../components/Tiptap';
import { db, storage } from '../../../libs/firebase';
import { adminDB } from '../../../libs/firebase-admin';
import { useAuth } from '../../../libs/userContext';
import styles from '../../../styles/Modal.module.css';
import { Article } from '../../../types/article';

export default function Home({
  defaultContent,
  defaultTitle,
  defaultThumbnail,
  defaultWriterId,
  defaultWriter,
  defaultSpotName,
  defaultSpotId,
  defaultSpotCategory,
  defaultIsPublic,
  defaultTag,
  defaultCategory,
  defaultDescription,
}: {
  defaultSpotCategory: string | null;
  defaultSpotId: string | null;
  defaultSpotName: string | null;
  defaultWriter: string | null;
  defaultWriterId: string | null;
  defaultThumbnail: string | null;
  defaultTitle: string | null;
  defaultContent: JSON | null;
  defaultIsPublic: boolean | null;
  defaultTag: Array<string> | null;
  defaultCategory: string | null;
  defaultDescription: string | null;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const { userId, articleId } = router.query;
  // 記事とユーザーが取れてからif文でガードする。ユーザーと著者が一致していればローディングtrue
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Article>();

  const upload = (data) => {
    const articleDoc = doc(db, `articles/${articleId}`);
    const articleContentDoc = doc(db, `articles/${articleId}/content/content`);

    if (user.id == 'article') {
      const article: Article = {
        id: articleId as string,
        isPublic: data.isPublic,
        tag: tag,
        category: data.category,
        title: data.title,
        description: data.description,
        writerId: user.uid,
        writer: user.id,
        createdAt: Date.now(),
        spotId: data?.spotId,
        spotName: data?.spotName,
        spotArticleId: `${articleId}`,
        spotCategory: data?.spotCategory,
      };

      setDoc(articleDoc, article, {
        merge: true,
      }).then(() => {
        alert('保存完了');
      });
      setDoc(articleContentDoc, content, { merge: true });
    } else {
      const article = {
        id: articleId as string,
        isPublic: data.isPublic,
        tag: tag,
        category: data.category,
        title: data.title,
        description: data.description,
        writerId: user.uid,
        writer: user.id,
        createdAt: Date.now(),
      };

      setDoc(articleDoc, article, {
        merge: true,
      }).then(() => {
        alert('保存完了');
      });
      setDoc(articleContentDoc, content, { merge: true });
    }
    // // userドキュメントに反映
    // const userDoc = doc(db, `users/${user.uid}/articleIds`);
    // setDoc(
    //   userDoc,
    //   {
    //     articleId,
    //   },
    //   {
    //     merge: true,
    //   }
    // ).then(() => {
    //   SetUploadImage(false);
    //   alert('保存完了');
    // });
  };

  const [title, setTitle] = useState(defaultTitle);
  const handleTitle = (event) => {
    console.log(title);
    setTitle(event.target.value);
  };
  const [description, setDescription] = useState(defaultDescription);
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const [tag, setTag] = useState(defaultTag);
  const handleTag = (event) => {
    setTag(event.target.value.split(','));
  };
  const [spotId, setSpotId] = useState(defaultSpotId);
  const [spotName, setSpotName] = useState('');
  const [spotArticleId, setSpotArticleId] = useState('');
  const [spotCategory, setSpotCategory] = useState('');

  const categories = ['観光', '特産品', '体験'];
  const [body, setBody] = useState<any>(defaultContent);
  const [content, setContent] = useState(defaultContent);
  const [isPublic, setIsPublic] = useState();
  const [category, setCategory] = useState();
  const handleIsPublic = (event) => {
    setIsPublic(event.target.value);
  };
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleSpotId = (event) => {
    setSpotId(event.target.value);
  };
  const handleSpotName = (event) => {
    setSpotName(event.target.value);
  };
  const handleSpotCategory = (event) => {
    setSpotCategory(event.target.value);
  };

  //　記事idを取得後記事の中身をセット
  // useEffect(() => {
  //   if (!articleId) {
  //     return;
  //   }

  //   const defaultDoc = doc(
  //     db,
  //     // 本来はarticleIdが入ってから取得
  //     `articles/${articleId}`
  //   );
  //   console.log(articleId, 'articleId');
  //   const defaultContentDoc = doc(
  //     db,
  //     // 本来はarticleIdが入ってから取得
  //     `articles/${articleId}/content/content`
  //   );

  //   getDoc(defaultDoc).then((result) => {
  //     const articleData = result.data();
  //     console.log(articleData, '記事データ');
  //     if (articleData) {
  //       const defaultIsPublic = articleData.isPublic;
  //       const defaultTag = articleData?.tag;
  //       const defaultCategory = articleData.category;
  //       const defaultPhoto = articleData.thumbnail;
  //       const defaultTitle = articleData.title;
  //       const defaultDescription = articleData.description;

  //       const defaultSpotId = articleData.spotId;
  //       const defaultSpotName = articleData.spotName;
  //       const defaultSpotCategory = articleData.spotCategory;

  //       if (defaultTag) {
  //         setTag(defaultTag);
  //       }
  //       if (defaultCategory) {
  //         setCategory(defaultCategory);
  //       }
  //       if (defaultIsPublic) {
  //         setIsPublic(defaultIsPublic);
  //       }
  //       if (defaultDescription) {
  //         setDescription(defaultDescription);
  //       }
  //       if (defaultTitle) {
  //         setTitle(defaultTitle);
  //       }
  //       if (defaultPhoto) {
  //         setPreview(defaultPhoto);
  //       }
  //       if (defaultSpotId) {
  //         setSpotId(defaultSpotId);
  //       }
  //       if (defaultSpotName) {
  //         setSpotName(defaultSpotName);
  //       }
  //       if (defaultSpotCategory) {
  //         setSpotCategory(defaultSpotCategory);
  //       }
  //     }
  //   });
  //   getDoc(defaultContentDoc).then((result) => {
  //     const articleContentData = result.data();
  //     const defaultBody = articleContentData;
  //     if (defaultBody) {
  //       setBody(defaultBody);
  //     }
  //   });
  //   // 第二引数は、ロードする条件指定
  //   if (userId != user?.uid) {
  //     console.log('編集権限がありません。');
  //     // router.push('/');
  //   }
  // }, [articleId, user?.uid]);
  // プレビュー画像を管理
  const [preview, setPreview] = useState<string>(defaultThumbnail);

  // クロッパーを管理
  const [cropper, setCropper] = useState<Cropper | null>();

  // クロップ対象のファイルを管理
  const [targetFile, setTargetFile] = useState<Blob | null>();

  // アップロードボタン
  const [uploadImage, SetUploadImage] = useState<boolean>(false);
  const [uploadThumbnailImage, SetUploadThumbnailImage] =
    useState<boolean>(false);

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
  const uploadThumbnail = async () => {
    // 保存先のRefを取得
    if (uploadThumbnailImage) {
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
        SetUploadThumbnailImage(false);
        alert('保存完了');
      });
    }
  };

  return (
    <>
      <Heading>
        <BeakerIcon className="h-6 w-6 mr-6" />
        <p className="text-xl font-bold">見出しです!</p>
      </Heading>
      <div className="container pt-8 pb-16">
        <div>
          <form onSubmit={handleSubmit(upload)}>
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
                {...register('isPublic', { required: true })}
                value={isPublic}
                onChange={(event) => handleIsPublic(event)}
              >
                <option value={'true'}>公開</option>
                <option value={'false'}>非公開</option>
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
                  value={category}
                  onChange={(event) => handleCategory(event)}
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
            <p className="text-right">{title?.length} /32文字</p>
            <textarea
              placeholder="ディスクリプション"
              className="block p-1 mt-6 border-gray-300 border-b-2 w-full outline-none"
              {...register('description', { required: true })}
              onChange={(event) => handleDescription(event)}
              value={description}
            />
            <input
              placeholder="タグ(カンマ区切り)"
              className="block p-1 mt-6 border-gray-300 border-b-2 w-full outline-none"
              {...register('tag', { required: true })}
              onChange={(event) => handleTag(event)}
              type={'tag'}
              value={tag}
            />
            <p className="text-right">{description?.length} /120文字</p>
            {user?.id == 'article' && (
              <>
                <input
                  placeholder="スポットID"
                  className="block p-1 mt-6 border-gray-300 border-b-2 w-full outline-none"
                  {...register('spotId')}
                  onChange={(event) => handleSpotId(event)}
                  type={'text'}
                  value={spotId}
                />
                <input
                  placeholder="スポット名"
                  className="block p-1 mt-6 border-gray-300 border-b-2 w-full outline-none"
                  {...register('spotName')}
                  onChange={(event) => handleSpotName(event)}
                  type={'text'}
                  value={spotName}
                />
                <input
                  placeholder="スポットカテゴリ"
                  className="block p-1 mt-6 border-gray-300 border-b-2 w-full outline-none"
                  {...register('spotCategory')}
                  onChange={(event) => handleSpotCategory(event)}
                  type={'text'}
                  value={spotCategory}
                />
              </>
            )}
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
                      SetUploadThumbnailImage(true);
                    }}
                  >
                    適用
                  </button>
                </div>
              </Modal>
            </div>

            <div className="mt-6 ">
              <Tiptap
                onChange={(e: any) => setContent(e)}
                content={body}
                editable={true}
              />
            </div>
            <div className="block lg:flex mt-6">
              <button className="mr-auto mt-3 block px-8 py-2 bg-red-600 hover:bg-pink-600 shadow rounded text-white font-bold">
                削除
              </button>
              <button
                className="mt-3 ml-auto block px-8 py-2 bg-blue-600 hover:bg-indigo-600 shadow rounded text-white font-bold"
                type="submit"
                onClick={uploadThumbnail}
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

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const snap = await adminDB.doc(`articles/${context.params.articleId}`).get();
  const snapContent = await adminDB
    .doc(`articles/${context.params.articleId}/content/content`)
    .get();
  const article = await snap.data();
  const articleContent = await snapContent?.data();
  if (article?.id) {
    if (article?.writer === 'article') {
      return {
        props: {
          defaultContent: articleContent,
          defaultTitle: article?.title,
          defaultThumbnail: article?.thumbnail,
          defaultWriterId: article?.writerId,
          defaultWriter: article?.writer,
          defaultSpotName: article?.spotName,
          defaultSpotId: article?.spotId,
          defaultSpotCategory: article?.spotCategory,
          defaultIsPublic: article?.isPublic,
          defaultTag: article?.tag,
          defaultCategory: article?.category,
          defaultDescription: article?.description,
        },
        // revalidate: 3000,
        // will be passed to the page component as props
      };
    } else {
      return {
        props: {
          defaultContent: articleContent,
          defaultTitle: article?.title,
          defaultThumbnail: article?.thumbnail,
          defaultWriterId: article?.writerId,
          defaultWriter: article?.writer,
          defaultIsPublic: article?.isPublic,
          defaultTag: article?.tag,
          defaultCategory: article?.category,
          defaultDescription: article?.description,
        },
        // revalidate: 3000,
        // will be passed to the page component as props
      };
    }
  } else {
    return {
      props: {},
    };
  }
};
