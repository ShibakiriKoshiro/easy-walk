import { hitComponent } from '../components/HitComponent';
import { indexName, searchClient } from '../libs/searchClient';
import { InstantSearch, Hits, Configure } from 'react-instantsearch-dom';
import React, { useRef, useState, useEffect } from 'react';
import { CustomPagination } from '../components/algolia/pagenation';
import { CustomSearchBox } from '../components/algolia/searchbox';
import { CustomHits } from '../components/algolia/hitResult';
import qs from 'qs';
import {
  SearchBox,
  RefinementList,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useRouter } from 'next/router';

const DEBOUNCE_TIME = 400;

const createURL = (state) => {
  console.log(state, 'state');
  const isDefaultRoute = !state.query && state.page === 1;
  // state.refinementList &&
  // state.refinementList.tag.length === 0 &&
  // state.refinementList.category;

  if (isDefaultRoute) {
    return '';
  }

  // const categoryPath = state.category
  //   ? `${getCategorySlug(state.category)}/`
  //   : '';
  const queryParameters: any = {};

  if (state.query) {
    queryParameters.query = encodeURIComponent(state.query);
  }
  if (state.page !== 1) {
    queryParameters.page = state.page;
  }
  // if (state.refinementList.tag) {
  //   queryParameters.tag = state.refinementList.tag.map(encodeURIComponent);
  // }

  const queryString = qs.stringify(queryParameters, {
    addQueryPrefix: true,
    arrayFormat: 'repeat',
  });
  console.log(queryString, 'queryString');

  return `/search/${queryString}`;
  // return `/search/${categoryPath}${queryString}`;
};

const searchStateToUrl = (searchState) =>
  searchState ? createURL(searchState) : '';

export default function Search() {
  const router = useRouter();

  const urlToSearchState = () => {
    // const pathnameMatches = location.pathname.match(/search\/(.*?)\/?$/);
    // const category = getCategoryName(
    //   (pathnameMatches && pathnameMatches[1]) || ''
    // );
    const { query = '', page = 1, brands = [] } = qs.parse(router.query as any);
    // `qs` does not return an array when there's a single value.
    const allBrands = Array.isArray(brands) ? brands : [brands].filter(Boolean);

    return {
      query: decodeURIComponent(query as string),
      page,
      // menu: {
      //   categories: decodeURIComponent(category),
      // },
      refinementList: {
        brand: allBrands.map(decodeURIComponent),
      },
    };
  };

  const [searchState, setSearchState] = useState(urlToSearchState());
  const debouncedSetStateRef = useRef(null);

  function onSearchStateChange(updatedSearchState) {
    clearTimeout(debouncedSetStateRef.current);

    debouncedSetStateRef.current = setTimeout(() => {
      router.push(searchStateToUrl(updatedSearchState), null, {
        shallow: true,
      });
    }, DEBOUNCE_TIME);

    setSearchState(updatedSearchState);
  }

  useEffect(() => {
    if (router.isReady) {
      setSearchState(urlToSearchState());
    }
  }, [router.isReady]);

  return (
    <div className="container">
      <InstantSearch
        indexName={indexName}
        searchClient={searchClient}
        stalledSearchDelay={500}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
        createURL={createURL}
      >
        <Configure hitsPerPage={2} />
        <CustomSearchBox />
        {/* <Hits hitComponent={hitComponent} /> */}
        <CustomHits />
        <CustomPagination />
      </InstantSearch>
    </div>
  );
}
