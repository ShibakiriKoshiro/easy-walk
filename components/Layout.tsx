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
  QrcodeIcon,
  RefreshIcon,
  ShieldCheckIcon,
  TicketIcon,
  ViewGridIcon,
} from '@heroicons/react/outline';
import { signOut } from 'firebase/auth';
import { Menu } from '@headlessui/react';
import {
  BellIcon,
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline';
import {
  CurrencyDollarIcon,
  FilmIcon,
  InformationCircleIcon,
  MailIcon,
  MapIcon,
  PuzzleIcon,
  TagIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid';

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
];
const userNavigation = [
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
  {
    name: 'チケット',
    href: '/dashboard/ticket',
    icon: TicketIcon,
  },
  {
    name: 'QRコード',
    href: '/dashboard/qr-reader',
    icon: QrcodeIcon,
  },
];

const dashboards = [
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
  {
    name: 'チケット',
    href: '/dashboard/ticket',
    icon: TicketIcon,
  },
];
const callsToAction = [
  { name: 'Watch Demo', href: '#', icon: PlayIcon },
  { name: 'Contact Sales', href: '#', icon: PhoneIcon },
];
const sideNavList = [
  {
    href: '/',
    label: 'マップ',
    icon: <MapIcon className="h-6 w-6" fill="none" stroke="currentColor" />,
  },
  {
    href: '/',
    label: 'カテゴリ',
    icon: <TagIcon className="h-6 w-6" fill="none" stroke="currentColor" />,
    categories: [
      { href: '/', label: '観光' },
      { href: '/', label: 'しまなみ海道' },
      { href: '/', label: '体験' },
      { href: '/', label: '特産品' },
      { href: '/', label: '移住' },
      { href: '/', label: '関連' },
      { href: '/', label: '取材記事' },
      { href: '/', label: '店舗一覧' },
      { href: '/', label: 'その他情報' },
    ],
  },
  {
    href: '/',
    label: 'SNS',
    icon: <FilmIcon className="h-6 w-6" fill="none" stroke="currentColor" />,
    categories: [
      { href: '/', label: 'Twitter' },
      { href: '/', label: 'Instagram' },
      {
        href: '/',
        label: 'YouTube',
        element: (
          <div className="border-b border-gray-400 border-solid w-full"></div>
        ),
      },
    ],
  },
  {
    href: '/stamp',
    label: 'スタンプラリー',
    icon: <PuzzleIcon className="h-6 w-6" fill="none" stroke="currentColor" />,
  },
  {
    href: '/',
    label: 'マイリスト',
    icon: <ThumbUpIcon className="h-6 w-6" fill="none" stroke="currentColor" />,
  },
  {
    href: '/',
    label: 'プラン',
    icon: (
      <CurrencyDollarIcon
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
      />
    ),
    element: (
      <div className="border-b border-gray-400 border-solid w-full"></div>
    ),
  },
  {
    href: '/',
    label: '運営者情報',
    icon: (
      <InformationCircleIcon
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
      />
    ),
    categories: [
      { href: '/', label: '運営会社' },
      { href: '/', label: '利用規約' },
      { href: '/', label: 'プライバシーポリシー' },
      {
        href: '/',
        label: '特定商取引法に基づく表示',
        element: (
          <div className="border-b border-gray-400 border-solid w-full"></div>
        ),
      },
    ],
  },
  {
    href: '/',
    label: 'お問い合わせ',
    icon: <MailIcon className="h-6 w-6" fill="none" stroke="currentColor" />,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Layouts: FC = (props: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        document.location.reload();
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
  }, [user?.uid, user?.avatarUrl]);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden mt-16"
            onClose={() => setSidebarOpen(false)}
            open={!sidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75 mt-16" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-blue-100">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {sideNavList.map((item) => (
                      <div key={item.label}>
                        <>
                          <Link key={item.label} href={item.href}>
                            <a className="block py-3 px-4 hover:bg-gray-100">
                              <div className="flex items-center">
                                {item.icon}
                                <p className="pl-4 text-base">{item.label}</p>
                              </div>
                            </a>
                          </Link>
                          {item.element}
                        </>
                        {item.categories &&
                          item.categories.map((category) => (
                            <div key={category.label}>
                              <Link key={category.label} href={category.href}>
                                <a className="block py-3 px-4 hover:bg-gray-100">
                                  <div className="flex items-center">
                                    <p className="pl-10 text-base">
                                      {category.label}
                                    </p>
                                  </div>
                                </a>
                              </Link>
                              {category.element}
                            </div>
                          ))}
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 mt-16">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow bg-blue-100 overflow-y-auto">
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {sideNavList.map((item) => (
                  <div key={item.label}>
                    <>
                      <Link key={item.label} href={item.href}>
                        <a className="block py-3 px-4 hover:bg-gray-100 rounded">
                          <div className="flex items-center">
                            {item.icon}
                            <p className="pl-4 text-base">{item.label}</p>
                          </div>
                        </a>
                      </Link>
                      {item.element}
                    </>
                    {item.categories &&
                      item.categories.map((category) => (
                        <div key={category.label}>
                          <Link key={category.label} href={category.href}>
                            <a className="block py-3 px-4 hover:bg-gray-100 rounded">
                              <div className="flex items-center">
                                <p className="pl-10 text-base">
                                  {category.label}
                                </p>
                              </div>
                            </a>
                          </Link>
                          {category.element}
                        </div>
                      ))}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              type="button"
              className="px-4 border-gray-200 text-gray-500 outline-none lg:hidden"
              onClick={() => setSidebarOpen((sidebarOpen) => !sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex items-center">
                <Link href="/">
                  <a>
                    <div className="flex items-center">
                      <BookmarkIcon className="h-6 w-6" aria-hidden="true" />
                      Easy-Walk
                    </div>
                  </a>
                </Link>
              </div>
              <div className="ml-auto flex items-center justify-end">
                <Link href="/search">
                  <a>
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </Link>
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                {/* Profile dropdown */}
                {user ? (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={userAvatar}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <>
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="flex hover:bg-gray-50 py-2 px-2"
                                >
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
                              </>
                            )}
                          </Menu.Item>
                        ))}
                        <button
                          onClick={logOut}
                          className="w-full hover:bg-gray-50 py-2 px-2 outline-none font-bold border-t"
                        >
                          ログアウト
                        </button>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link href="/signin">
                    <a>
                      <div className="bg-blue-600 py-1 px-2 shadow rounded-sm text-white">
                        <p>ログイン</p>
                      </div>
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <main className="lg:pl-64">
            <div className="">
              <div className="">{props.children}</div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
export default Layouts;
