import { CameraIcon } from '@heroicons/react/solid';
import parse from 'html-react-parser';
import dynamic from 'next/dynamic';
import React, { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import Heading from '../../components/Heading';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
});

type Inputs = {
  title: string;
  description: string;
  category: string;
  status: 'public' | 'private';
  value: string;
};

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data) => {
    console.log(data);
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

  const [value, setValue] = useState('');

  const categories = ['観光', '特産品', '体験'];

  const onFileChange = (e: FormEvent<HTMLLabelElement>) => {
    const target: any = e.target;
    const files = target.files;

    if (files.length) {
      console.log(files[0]);
    }
  };

  return (
    <>
      <Heading />
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
              <div className="bg-yellow-300 rounded inline-block h-24 w-32 overflow-hidden"></div>
              <label
                htmlFor="avater"
                className="h-full mt-auto -ml-6 cursor-pointer"
                onChange={(e) => {
                  return onFileChange(e);
                }}
              >
                <input id="avater" type="file" className="hidden" />
                <CameraIcon
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                />
              </label>
            </div>
            <div className="w-full mt-6">
              <label
                htmlFor="country"
                className="text-base block font-medium text-gray-700"
              >
                カテゴリー
              </label>
              <select
                id="country"
                name="country"
                autoComplete="country"
                className="text-lg font-bold mt-1 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                {...register('category', { required: true })}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="mt-6">
              <QuillNoSSRWrapper
                modules={modules}
                placeholder="compose here"
                value={value}
                onChange={setValue}
                formats={formats}
                theme="snow"
              />
              <button onClick={(e) => onSubmit(value)}> Send post</button>
              <p>{value}</p>
              {parse(value)}
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
