import { Dialog, Transition } from '@headlessui/react';
import { MenuIcon, SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React, { Fragment, useState } from 'react';
import Sidebar from './Sidebar';

const Layouts = () => {
  const [open, setOpen] = useState(false);
  const changeDrower = () => {
    setOpen((prevState) => !prevState);
    console.log(open);
  };

  return (
    <>
      <div className="fixed w-full h-16 bg-blue-300 z-10">
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
          <div className="ml-6">
            <Link href="/login">
              <a>
                <div className="bg-blue-600 py-1 px-2 shadow rounded-sm text-white">
                  <p>ログイン</p>
                </div>
              </a>
            </Link>
          </div>
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
    </>
  );
};
export default Layouts;
