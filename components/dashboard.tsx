import React from 'react';
import Link from 'next/link';
const Dashboard = (select) => {
  const dashboardMenu = [
    {
      name: '記事管理',
      href: '/dashboard/articles',
      serected: { select },
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
                menu.serected
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
