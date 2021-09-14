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
import Link from 'next/link';

const Sidebar = () => {
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
      href: '/',
      label: 'スタンプラリー',
      icon: (
        <PuzzleIcon className="h-6 w-6" fill="none" stroke="currentColor" />
      ),
    },
    {
      href: '/',
      label: 'マイリスト',
      icon: (
        <ThumbUpIcon className="h-6 w-6" fill="none" stroke="currentColor" />
      ),
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

  return (
    <div className="py-6">
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
                      <p className="pl-10 text-base">{category.label}</p>
                    </div>
                  </a>
                </Link>
                {category.element}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
