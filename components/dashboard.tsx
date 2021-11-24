import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

const Dashboard = ({ children }) => {
  const router = useRouter();
  const tabs = [
    {
      name: '記事管理',
      href: '/dashboard/articles',
    },
    {
      name: 'マイリスト',
      href: '/dashboard/my-list',
    },
    {
      name: 'マイページ',
      href: '/dashboard/mypage',
    },
    {
      name: 'スタンプ',
      href: '/dashboard/stamp',
    },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <div>
      <Tab.Group as="div" className="mt-4">
        <div className="-mx-4 flex overflow-x-auto sm:mx-0">
          <div className="flex-auto px-4 border-b border-gray-200 sm:px-0">
            <Tab.List className="-mb-px flex space-x-10">
              {tabs.map((tab) => (
                <Link href={tab.href} key={tab.name}>
                  <a>
                    <Tab
                      className={
                        tab.href === router.pathname
                          ? 'border-indigo-500 text-indigo-600 whitespace-nowrap py-6 border-b-2 font-medium text-sm'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-6 border-b-2 font-medium text-sm'
                      }
                    >
                      {tab.name}
                    </Tab>
                  </a>
                </Link>
              ))}
            </Tab.List>
          </div>
        </div>
      </Tab.Group>
      {children}
    </div>
  );
};

export default Dashboard;
