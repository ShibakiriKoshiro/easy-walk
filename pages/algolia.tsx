import { hitComponent } from '../components/HitComponent';
import { indexName, searchClient } from '../libs/searchClient';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  Pagination,
} from 'react-instantsearch-dom';
import 'instantsearch.css/themes/reset.css';

export default function Search(): JSX.Element {
  return (
    <div className="container">
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <Configure hitsPerPage={5} />
        <div className="w-4/5 sm:w-2/3 mx-auto gap-4">
          <SearchBox />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Hits hitComponent={hitComponent} />
        </div>

        <Pagination />
      </InstantSearch>
    </div>
  );
}
