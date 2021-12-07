/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from '@headlessui/react';
import {
  BookmarkIcon,
  GlobeIcon,
  MenuIcon,
  NewspaperIcon,
  SearchIcon,
  UserIcon,
} from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, Fragment, ReactNode, useEffect, useState } from 'react';
import { auth, db } from '../libs/firebase';
import { useAuth } from '../libs/userContext';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Image from 'next/image';
import { Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import {
  ChartBarIcon,
  CursorClickIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  ViewGridIcon,
} from '@heroicons/react/outline';
import { signOut } from 'firebase/auth';

const solutions = [
  {
    name: 'マイページ',
    href: '/dashboard/mypage',
    icon: UserIcon,
  },
  {
    name: 'マイリスト',
    href: '/dashboard/my-list',
    icon: BookmarkIcon,
  },
  {
    name: '記事管理',
    href: '/dashboard/articles',
    icon: NewspaperIcon,
  },
  {
    name: 'スタンプ',
    href: '/dashboard/stamp',
    icon: GlobeIcon,
  },
];
const callsToAction = [
  { name: 'Watch Demo', href: '#', icon: PlayIcon },
  { name: 'Contact Sales', href: '#', icon: PhoneIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Layouts: FC = (props: { children: ReactNode }) => {
  const { user } = useAuth();
  const [userAvatar, setUserAvatar] = useState<string>();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const changeDrower = () => {
    setOpen((prevState) => !prevState);
  };

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('ログアウト');
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useEffect(() => {
    if (user?.uid) {
      // ${user.uid} uidを指定して取得したい
      const userDoc = doc(db, `users/${user.uid}`);

      getDoc(userDoc).then((result) => {
        const userData = result.data();
        const photo = userData?.avatarUrl;
        if (photo) {
          setUserAvatar(photo);
        }
      });
    }
    // 第二引数は、ロードする条件指定
  }, [user?.uid]);

  return (
    <div className="min-h-screen relative top-0">
      <div className="fixed w-full h-16 bg-blue-300 z-10 top-0">
        <nav className="flex w-full h-full container mx-auto items-center">
          <div className="text-left">
            <button onClick={changeDrower}>
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="ml-auto">
            <Link href="/search">
              <a>
                <SearchIcon className="h-6 w-6" />
              </a>
            </Link>
          </div>
          {user ? (
            <Popover className="relative my-auto">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'my-auto rounded-full group ml-12 flex items-center text-base font-medium hover:text-gray-900'
                    )}
                  >
                    <img
                      src={userAvatar}
                      className=" w-8 h-8 rounded-full my-auto"
                      alt="avatar"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="rounded-lg shadow-lg overflow-hidden">
                        <div className="relative grid bg-white">
                          {solutions.map((item) => (
                            <Link key={item.name} href={item.href}>
                              <a className="flex hover:bg-gray-50 py-2 px-2">
                                <item.icon
                                  className="flex-shrink-0 h-6 w-6 text-indigo-600"
                                  aria-hidden="true"
                                />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                </div>
                              </a>
                            </Link>
                          ))}
                          <button
                            onClick={logOut}
                            className="hover:bg-gray-50 py-2 px-2 outline-none font-bold border-t"
                          >
                            ログアウト
                          </button>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          ) : (
            <Link href="/signin">
              <a>
                <div className="bg-blue-600 py-1 px-2 shadow rounded-sm text-white">
                  <p>ログイン</p>
                </div>
              </a>
            </Link>
          )}
        </nav>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="mt-16 fixed inset-0 overflow-hidden"
          open={!changeDrower}
          onClose={changeDrower}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-y-0 left-0 max-w-full flex mt-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative w-screen max-w-xs">
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="overflow-y-scroll">
                      <Sidebar />
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <main className="py-16">{props.children}</main>
      <Footer />
    </div>
  );
};
export default Layouts;
