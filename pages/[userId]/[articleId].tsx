/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  FlagIcon,
  QuestionMarkCircleIcon,
  ShareIcon,
  ThumbUpIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Blockquote from '@tiptap/extension-blockquote';
// ImageはnextImageとかぶるためImgにした
import Img from '@tiptap/extension-image';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { auth, db } from '../../libs/firebase';
import Tiptap from '../../components/Tiptap';
import { adminDB } from '../../libs/firebase-admin';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  TwitterShareButton,
  FacebookShareButton,
  LineShareButton,
  TwitterIcon,
  FacebookIcon,
  LineIcon,
} from 'react-share';
import { UserIcon } from '@heroicons/react/outline';
import { useAuth } from '../../libs/userContext';
import { query, where, getDocs } from 'firebase/firestore';
import { Stamp } from '../../types/stamp';

const Article = ({
  content,
  title,
  thumbnail,
  writerId,
  writer,
  spotName,
  spotId,
  spotCategory,
}: {
  spotCategory: string | null;
  spotId: string | null;
  spotName: string | null;
  writer: string | null;
  writerId: string | null;
  thumbnail: string | null;
  title: string | null;
  content: JSON | null;
}) => {
  console.log(content, 'content');
  const { user } = useAuth();
  const router = useRouter();
  const { userId, articleId } = router.query;
  if (userId != writer) {
    return <p>このページは存在しません</p>;
  }
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  // いいね機能
  const [like, setLike] = useState('');
  // スタンプ機能
  const [go, setGo] = useState<boolean>();

  useEffect(() => {
    const writerDoc = doc(db, `users/${writerId}`);

    getDoc(writerDoc).then((result) => {
      const writerData = result.data();
      if (writerData) {
        setAvatar(writerData.avatarUrl);
        setName(writerData.name);
      }
    });

    if (user?.uid) {
      const articleDoc = doc(db, `articles/${articleId}`);
      getDoc(articleDoc).then((result) => {
        const articleData = result.data();
        if (articleData.favorite) {
          const checkFavorite = articleData.favorite.find(
            (favorite) => favorite === user.uid
          );
          //とれてる
          if (checkFavorite) {
            setLike(user.uid);
          } else {
            setLike(null);
          }
        }
      });
    }
    if (user?.uid && user?.id === 'article') {
      const stampRef = collection(db, `users/${user.uid}/stamps`);
      const q = query(stampRef, where('spotName', '==', spotName));
      getDocs(q).then((snap) => {
        const items = snap.docs.map((doc) => doc.data());
        if (items[0]?.visitedAt) {
          setGo(true);
        } else {
          setGo(false);
        }
      });
    }

    // 第二引数は、ロードする条件指定
  }, [writerId, user]);
  const addFavorite = () => {
    if (user) {
      const newFavorite: any = doc(db, 'articles', `${articleId}`);
      updateDoc(newFavorite, {
        favorite: arrayUnion(`${user.uid}`),
      });
      setLike(user.uid);
    } else {
      // router.push('/signup');
    }
  };

  const deleteFavorite = () => {
    if (user) {
      const deleteFavorite: any = doc(db, 'articles', `${articleId}`);
      updateDoc(deleteFavorite, {
        favorite: arrayRemove(user.uid),
      });
      setLike(null);
    }
  };

  const addStamp = () => {
    const stampRef = collection(db, `users/${user.uid}/stamps`);
    const q = query(stampRef, where('spotName', '==', spotName));
    getDocs(q).then((snap) => {
      const items = snap.docs.map((doc) => doc.data());
      // 2回目なら
      if (items[0]?.name) {
        setGo(true);
      } else {
        // 初回なら
        setDoc(doc(db, `users/${user.uid}/stamps`, spotId), {
          spotId: spotId,
          spotName: spotName,
          spotCategory: spotCategory,
          spotArticleId: articleId,
          visitedAt: Date.now(),
        });
        setGo(true);
      }
    });
  };

  const deleteStamp = async () => {
    if (user) {
      await deleteDoc(doc(db, `users/${user.uid}/stamps`, spotId));
      setGo(false);
    }
  };

  return (
    <div className="container mt-16">
      <div className="block lg:flex">
        <div className="w-full lg:w-2/12"></div>
        <article className="w-full lg:w-6/12">
          {thumbnail && (
            <div className="mx-auto">
              <img src={thumbnail} width={700} height={475} alt="photo" />
            </div>
          )}
          <div className="flex items-center">
            {title && <h1 className="text-4xl mt-3">{title}</h1>}
            {like ? (
              <button onClick={deleteFavorite} className="ml-auto">
                <ThumbUpIcon className="h-10 w-10 text-blue-600" />
              </button>
            ) : (
              <button onClick={addFavorite} className="ml-auto">
                <ThumbUpIcon
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                />
              </button>
            )}
          </div>
          <div className="flex mt-6 mb-3 pb-2 border-b border-blue-gray-300 ">
            <a href="#">
              <div className="flex">
                <QuestionMarkCircleIcon
                  className="h-6 w-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                />
                <p>質問する</p>
              </div>
            </a>
            {spotId && (
              <>
                {go ? (
                  <button className="ml-12">
                    <div className="flex">
                      <FlagIcon
                        onClick={deleteStamp}
                        className="h-6 w-6 mr-2 text-yellow-300"
                      />
                      <p>スタンプ</p>
                    </div>
                  </button>
                ) : (
                  <button onClick={addStamp} className="ml-12">
                    <div className="flex">
                      <FlagIcon
                        className="h-6 w-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                      />
                      <p>スタンプ</p>
                    </div>
                  </button>
                )}
              </>
            )}
            <TwitterShareButton
              url={`http://localhost:3000/${userId}/${articleId}`}
            >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <FacebookShareButton
              url={`http://localhost:3000/${userId}/${articleId}`}
            >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <LineShareButton
              url={`http://localhost:3000/${userId}/${articleId}`}
            >
              <LineIcon size={32} round={true} />
            </LineShareButton>
          </div>
          <Link href={`http://localhost:3000/${userId}/`}>
            <a>
              <div className="flex items-center">
                {avatar && (
                  <img
                    src={avatar}
                    width={64}
                    height={64}
                    alt="photo"
                    className="rounded-full"
                  />
                )}
                <div className="ml-3">
                  <p className="font-bold text-xl">{name}</p>
                  <p className="text-md text-gray-400">2021/9/28</p>
                </div>
              </div>
            </a>
          </Link>
          {content && (
            <div className="w-full mt-12 mb-24">
              <Tiptap editable={false} content={content} />
            </div>
          )}
        </article>
        <div className="w-full lg:w-1/12"></div>
        <div className="w-full ml-auto lg:w-3/12">
          <div className="">
            <Image
              src="/images/village.png"
              layout="responsive"
              width={700}
              height={475}
              alt="photo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const snap = await adminDB.doc(`articles/${context.params.articleId}`).get();
  const snapContent = await adminDB
    .doc(`articles/${context.params.articleId}/content/content`)
    .get();
  const article = await snap.data();
  const articleContent = await snapContent.data();
  if (article?.writer === 'article') {
    return {
      props: {
        content: articleContent,
        title: article?.title,
        thumbnail: article?.thumbnail,
        writerId: article?.writerId,
        writer: article?.writer,
        spotName: article?.spotName,
        spotId: article?.spotId,
        spotCategory: article?.spotCategory,
      },
      // revalidate: 3000,
      // will be passed to the page component as props
    };
  } else {
    return {
      props: {
        content: articleContent,
        title: article?.title,
        thumbnail: article?.thumbnail,
        writerId: article?.writerId,
        writer: article?.writer,
      },
      // revalidate: 3000,
      // will be passed to the page component as props
    };
  }
};

// useEffect(() => {
//   if (editor) {
//     const articleDoc = doc(db, `articles/uzRi3G661FQ3UpL82I6e`);
//     getDoc(articleDoc).then((result) => {
//       const articleData = result.data();
//       const mainDocment: JSON = articleData?.json;
//       if (mainDocment) {
//         editor.commands.setContent(mainDocment);
//       }
//     });
//     // 第二引数は、ロードする条件指定
//   }
// }, [editor]);
