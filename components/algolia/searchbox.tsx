import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <>
    <div className="pt-2 mb-12 w-full sm:w-4/5 lg:w-3/5 mx-auto">
      <input
        className="border w-full py-3 px-4 font-base sm:font-lg outline-none rounded-3xl bg-gray-200 shadow"
        value={currentRefinement}
        onChange={(event) => refine(event.currentTarget.value)}
        placeholder="キーワードを入力.."
      />
    </div>
  </>
);

export const CustomSearchBox = connectSearchBox(SearchBox);
