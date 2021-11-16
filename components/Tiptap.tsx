/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import style from '../styles/tiptap.module.scss';
import Blockquote from '@tiptap/extension-blockquote';
import Heading from '@tiptap/extension-heading';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Image from '@tiptap/extension-image';
import { useAuth } from '../libs/userContext';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { db, storage } from '../libs/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Modal from 'react-modal';
import styles from '../styles/Modal.module.css';
import { CameraIcon } from '@heroicons/react/solid';

const Tiptap = ({ editable = true, content = '<p>Hello World! 🌎️</p>' }) => {
  const { user } = useAuth();
  // プレビュー画像を管理
  const [preview, setPreview] = useState<string>();

  // クロッパーを管理
  const [cropper, setCropper] = useState<Cropper | null>();

  // クロップ対象のファイルを管理
  const [targetFile, setTargetFile] = useState<Blob | null>();

  // クロップ対象の画像をセット
  const setImageToCropper = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event?.target.files?.[0] as Blob, 'クロップ対象の画像をセット');
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

    // 画像ファイル読み込み時に発動する処理s
    reader.onload = (event) => {
      // 文字列として読み込んだ画像をイメージタグにセット
      image.src = event?.target?.result as string;

      // クロッパーの初期化
      const wrapper = new Cropper(image, {
        aspectRatio: 16 / 9,
        // cropBoxResizable: false,
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
      // 実際はarticleIdを取得して動的に
      `articles/uzRi3G661FQ3UpL82I6e/${Date.now()}`
    );
    console.log(storageRef);
    console.log(preview);
    console.log(user);
    // 画像アップロード
    await uploadString(storageRef, preview as string, 'data_url');

    // アップロードした画像を表示するためのURLを取得
    const photoUrl = await getDownloadURL(storageRef);

    // FireStoreArticleテーブルに反映
    const userDoc = doc(db, `articles/uzRi3G661FQ3UpL82I6e/`);

    setDoc(
      userDoc,
      {
        photoUrl,
      },
      {
        merge: true,
      }
    ).then(() => {
      alert('保存完了');
    });
    const addImage = () => {
      // 実際には、ダイアログ立ち上げてクロッピング&アップロード&画像表示URL取得
      const imageURL = photoUrl;

      if (imageURL) {
        editor.chain().focus().setImage({ src: imageURL }).run();
      }
    };
    addImage();
  };

  const articleUpload = () => {
    const body = editor.getJSON();
    console.log(body);
    const articleDoc = doc(db, `articles/uzRi3G661FQ3UpL82I6e/`);
    setDoc(
      articleDoc,
      {
        body,
      },
      {
        merge: true,
      }
    ).then(() => {
      alert('保存完了');
    });
  };
  //　実際には、記事が入ってから実行

  /*  useEffect(() => {
    if (user?.uid) {
      const userDoc = doc(db, `articles/${user.uid}`);

      getDoc(userDoc).then((result) => {
        const userData = result.data();
        const photo = userData?.photoUrl;
        if (photo) {
          setPreview(photo);
        }
      });
    }
    // 第二引数は、ロードする条件指定
  }, [user?.uid]);
*/
  const MenuBar = ({ editor }) => {
    if (!editor) {
      return null;
    }

    return (
      <>
        <div className="flex items-center gap-3 border-b-2">
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'is-active' : ''}
          >
            P
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={
              editor.isActive('bold') ? 'is-active border ' : ' font-black'
            }
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={
              editor.isActive('italic') ? 'is-active' : ' italic font-serif'
            }
          >
            I
          </button>

          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
            {'<>'}
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
            }
          >
            見出し
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
            }
          >
            小見出し
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            bullet list
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            ordered list
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            blockquote
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            L
          </button>
          <button
            className="px-2 py-1 shadow-xl rounded bg-blue-700 text-white"
            onClick={uploadAvatar}
          >
            アップロード
          </button>
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
          >
            Table
          </button>
          <div className="flex">
            <label className="h-full mt-auto cursor-pointer">
              <input
                onChange={setImageToCropper}
                type="file"
                className="hidden"
              />
              <CameraIcon
                className="h-10 w-10"
                fill="none"
                stroke="currentColor"
              />
            </label>
          </div>
        </div>
      </>
    );
  };
  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: 'pl-2 border-l-4 border-gray-300',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
    ],
    content,
    editorProps: {
      editable: () => editable,
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose xl:prose-xl focus:outline-none m-2',
      },
    },
  });

  useEffect(() => {
    if (editor?.isActive) {
      editor.commands?.setContent(content || '');
    }
  }, [content, editor]);

  return (
    <>
      {editable && (
        <div className="">
          <MenuBar editor={editor} />
          <Modal
            isOpen={!!targetFile}
            onAfterOpen={initCropper}
            onRequestClose={() => setTargetFile(null)}
            ariaHideApp={false}
            className={styles.modal}
            overlayClassName={styles.overlay}
          >
            <h2 className="font-bold text-2xl mb-6">画像xxを切り取る</h2>

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
                }}
              >
                KKK
              </button>
            </div>
          </Modal>
        </div>
      )}
      <div className={editable ? 'border' : ''}>
        <EditorContent className="w-full" editor={editor} />
      </div>
      {editable && <button onClick={articleUpload}>JSON</button>}
    </>
  );
};

export default Tiptap;
