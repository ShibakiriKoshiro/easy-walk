import { BeakerIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const Sidebar = () => {
  const sideNavList = [
    {
      href: '/',
      label: 'マップ',
      icon: <BeakerIcon className="h-5 w-5 text-blue-500" />,
    },
    {
      href: '/',
      label: 'カテゴリ',
      icon: <BeakerIcon className="h-5 w-5 text-blue-500" />,
      categories: [
        { href: '/', label: '観光' },
        { href: '/', label: 'しまなみ海道' },
        { href: '/', label: '体験' },
      ],
    },
    {
      href: '/',
      label: 'SNS',
      icon: <BeakerIcon className="h-5 w-5 text-blue-500" />,
    },
  ];

  return (
    <div className="py-6">
      {sideNavList.map((item) => (
        <>
          <Link key={item.label} href={item.href}>
            <a className="block py-3 px-4 hover:bg-gray-100">
              <div className="flex">
                {item.icon}
                <p className="pl-4 text-base">{item.label}</p>
              </div>
            </a>
          </Link>
          {item.categories &&
            item.categories.map((category) => (
              <Link key={category.label} href={category.href}>
                <a className="block py-3 px-4 hover:bg-gray-100">
                  <div className="flex">
                    <p className="pl-10 text-base">{category.label}</p>
                  </div>
                </a>
              </Link>
            ))}
        </>
      ))}
    </div>
  );
};

export default Sidebar;
