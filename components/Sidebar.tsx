import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="py-6">
      <Link href="/">
        <a className="block py-3 px-4 hover:bg-gray-100">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <p className="pl-4 text-base">マップ</p>
          </div>
        </a>
      </Link>
      <Link href="/">
        <a className="block py-3 px-4 hover:bg-gray-100">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <p className="pl-4 text-base">マップ</p>
          </div>
        </a>
      </Link>
      <Link href="/">
        <a className="block py-2 px-4 hover:bg-gray-100">
          <p className="pl-10 text-base">観光</p>
        </a>
      </Link>
      <Link href="/">
        <a className="block py-2 px-4 hover:bg-gray-100">
          <p className="pl-10 text-base">しまなみ海道</p>
        </a>
      </Link>
      <Link href="/">
        <a className="block py-2 px-4 hover:bg-gray-100">
          <p className="pl-10 text-base">体験</p>
        </a>
      </Link>
      <Link href="/">
        <a className="block py-2 px-4 hover:bg-gray-100">
          <p className="pl-10 text-base">特産品</p>
        </a>
      </Link>
      <Link href="/">
        <a className="block py-2 px-4 hover:bg-gray-100">
          <p className="pl-10 text-base">移住</p>
        </a>
      </Link>
      <Link href="/">
        <a className="block py-2 px-4 hover:bg-gray-100">
          <p className="pl-10 text-base">関連</p>
        </a>
      </Link>
      <Link href="/">
        <a className="block py-2 px-4 hover:bg-gray-100">
          <p className="pl-10 text-base">取材記事</p>
        </a>
      </Link>
      <Link href="/">
        <a className="block py-2 px-4 hover:bg-gray-100">
          <p className="pl-10 text-base">店舗一覧</p>
        </a>
      </Link>
      <Link href="/">
        <a className="block py-2 px-4 hover:bg-gray-100">
          <p className="pl-10 text-base">その他情報</p>
        </a>
      </Link>
      <Link href="/">
        <a className="block py-3 px-4 hover:bg-gray-100">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
            <p className="pl-4 text-base">SNS</p>
          </div>
        </a>
      </Link>
      <Link href="/">
        <a className="block py-2 px-4 hover:bg-gray-100">
          <p className="pl-10 text-base">Twitter</p>
        </a>
      </Link>
      <Link href="/">
        <a className="block py-2 px-4 hover:bg-gray-100">
          <p className="pl-10 text-base">Instagram</p>
        </a>
      </Link>
      <Link href="/">
        <a className="block py-2 px-4 hover:bg-gray-100 border-b border-gray-400">
          <p className="pl-10 text-base">YouTube</p>
        </a>
      </Link>
    </div>
  );
};

export default Sidebar;
