import { hitComponent } from '../components/HitComponent';
import { indexName, searchClient } from '../libs/searchClient';
import { InstantSearch, Hits, Configure } from 'react-instantsearch-dom';

import { CustomPagination } from '../components/algolia/pagenation';
import { CustomSearchBox } from '../components/algolia/searchbox';
import { CustomHits } from '../components/algolia/hitResult';

export default function Search(): JSX.Element {
  return (
    <div className="container py-6">
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <Configure hitsPerPage={2} />
        <CustomSearchBox />
        {/* <Hits hitComponent={hitComponent} /> */}
        <CustomHits />
        <CustomPagination />
      </InstantSearch>
    </div>
  );
}
