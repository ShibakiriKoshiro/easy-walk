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
          <>
            <ul className="border-t border-gray-200 px-4 flex items-center sm:px-0">
              {currentRefinement > 1 && (
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
              {currentRefinement > 1 && currentRefinement < nbPages && (
                <li className="text-indigo-600 pt-4 px-4 inline-flex items-center text-md font-medium">
                  {currentRefinement}
                </li>
              )}
              {currentRefinement < nbPages && (
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
          </>
        )}
      </div>
    </>
  );
};

export const CustomPagination = connectPagination(Pagination);
