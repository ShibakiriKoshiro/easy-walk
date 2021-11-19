import React from 'react';
import Link from 'next/link';
const Dashboard = (selected) => {
  const dashboardMenu = [
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
  return (
    <div>
      <div className="">
        <ul className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl bg-blue-400 text-center">
          {dashboardMenu.map((menu) => (
            <li
              className={
                selected
                  ? 'w-full py-2 text-sm leading-5 font-medium bg-white rounded-lg text-blue-600'
                  : 'w-full py-2 text-sm leading-5 font-medium hover:bg-blue-300 rounded-lg text-black'
              }
              key={menu.name}
            >
              <Link href={menu.href}>
                <a className="block font-bold text-lg">{menu.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
