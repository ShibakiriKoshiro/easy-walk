import { connectPagination } from 'react-instantsearch-dom';
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/solid';

const Pagination = ({ currentRefinement, nbPages, refine, createURL }) => {
  return (
    <>
      <div className="mt-24 mb-6">
        {nbPages <= 1 && <></>}
        {nbPages > 1 && (
          <div className="border-t border-gray-200 container">
            <ul className="flex items-center sm:w-4/5 lg:w-3/5 mx-auto">
              {currentRefinement > 1 && currentRefinement < nbPages && (
                <li className="-mt-px w-0 flex-1 flex">
                  <a
                    className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-md font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    href={createURL(currentRefinement - 1)}
                    onClick={(event) => {
                      event.preventDefault();
                      refine(currentRefinement - 1);
                    }}
                  >
                    <ArrowNarrowLeftIcon
                      className="mr-3 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {currentRefinement - 1}ページへ
                  </a>
                </li>
              )}
              {currentRefinement > 1 && currentRefinement === nbPages && (
                <li className="-mt-px flex-1 flex f-full justify-center">
                  <a
                    className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-md font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    href={createURL(currentRefinement - 1)}
                    onClick={(event) => {
                      event.preventDefault();
                      refine(currentRefinement - 1);
                    }}
                  >
                    <ArrowNarrowLeftIcon
                      className="mr-3 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {currentRefinement - 1}ページへ
                  </a>
                </li>
              )}
              {currentRefinement > 1 && currentRefinement < nbPages && (
                <li className="text-indigo-600 pt-4 px-4 inline-flex items-center text-md font-medium">
                  {currentRefinement}
                </li>
              )}
              {currentRefinement > 1 && currentRefinement < nbPages && (
                <li className="-mt-px w-0 flex-1 flex justify-end">
                  <a
                    className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    href={createURL(currentRefinement + 1)}
                    onClick={(event) => {
                      event.preventDefault();
                      refine(currentRefinement + 1);
                    }}
                  >
                    次へ
                    <ArrowNarrowRightIcon
                      className="ml-3 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              )}
            </ul>
            {currentRefinement === 1 && currentRefinement < nbPages && (
              <li className="-mt-px flex-1 flex justify-center w-full">
                <a
                  className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  href={createURL(currentRefinement + 1)}
                  onClick={(event) => {
                    event.preventDefault();
                    refine(currentRefinement + 1);
                  }}
                >
                  次へ
                  <ArrowNarrowRightIcon
                    className="ml-3 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </a>
              </li>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export const CustomPagination = connectPagination(Pagination);
