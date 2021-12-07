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

const Article = ({ content, title, thumbnail, writerId }) => {
  const { user } = useAuth();
  const router = useRouter();
  const { userId, articleId } = router.query;
  if (userId != writerId) {
    return <p>このページは存在しません</p>;
  }
  const [avatar, setAvatar] = useState('');
  const [like, setLike] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const writerDoc = doc(
      db,
      // 本来はarticleIdが入ってから取得
      `users/${writerId}`
    );

    getDoc(writerDoc).then((result) => {
      const writerData = result.data();
      if (writerData) {
        setAvatar(writerData.avatarUrl);
        setName(writerData.name);
      }
    });

    if (user?.uid) {
      const articleDoc = doc(
        db,
        // 本来はarticleIdが入ってから取得
        `articles/${articleId}`
      );
      getDoc(articleDoc).then((result) => {
        const articleData = result.data();
        const checkFavorite = articleData.favorite.find(
          (favorite) => favorite === user.uid
        );
        //とれてる
        if (checkFavorite) {
          setLike(user.uid);
        } else {
          setLike(null);
        }
      });
    }

    // 第二引数は、ロードする条件指定
  }, [writerId, user]);
  const addFavorite = () => {
    const newFavorite: any = doc(db, 'articles', `${articleId}`);
    updateDoc(newFavorite, {
      favorite: arrayUnion(`${user.uid}`),
    });
    setLike(user.uid);
  };

  const deleteFavorite = () => {
    const deleteFavorite: any = doc(db, 'articles', `${articleId}`);
    updateDoc(deleteFavorite, {
      favorite: arrayRemove(user.uid),
    });
    setLike(null);
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
            <button className="ml-12">
              <div className="flex">
                <FlagIcon
                  className="h-6 w-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                />
                <p>足跡</p>
              </div>
            </button>
            <TwitterShareButton url={`http://localhost:3000/user/${articleId}`}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <FacebookShareButton
              url={`http://localhost:3000/user/${articleId}`}
            >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <LineShareButton url={`http://localhost:3000/user/${articleId}`}>
              <LineIcon size={32} round={true} />
            </LineShareButton>
          </div>
          <Link href="#">
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
  const article = snap.data();

  return {
    props: {
      content: article?.content,
      title: article?.title,
      thumbnail: article?.thumbnail,
      writerId: article?.writerId,
    },
    revalidate: 3000,
    // will be passed to the page component as props
  };
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
