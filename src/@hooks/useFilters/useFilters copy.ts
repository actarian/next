import { IEquatable } from '@core/entity/entity';
import { useSearchParams } from '@hooks/useSearchParams/useSearchParams';
import { IFeatureType } from '@models/feature_type/feature_type';
import { ITile } from '@models/tile/tile';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Filter } from './filter';
import { getFilters } from './filter.service';

export const PER_PAGE = 15;
// let q = 0;

export function useFilters(items: ITile[], featureTypes: IFeatureType[], filterMap: (key: string, item: any, value: IEquatable) => boolean, ssrItems?: ITile[], ssrValues: { [key: string]: IEquatable[] } = {}) {

  const { params, replaceParamsSilently } = useSearchParams('filters');
  // console.log('useFilters', params);

  const [maxLength, setMaxLength] = useState(PER_PAGE);
  const [hasMore, setHasMore] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);

  // creating filters with useMemo because is an heavy operation
  const filters = useMemo(() => {
    return getFilters<ITile>(items, featureTypes, filterMap, params);
  }, [featureTypes, filterMap]);

  // setting initial values
  const [values, setValues] = useState(filters.map(x => x.values));

  // setFilter is called when user select a filter value
  const setFilter = useCallback((filter?: Filter, values?: IEquatable[]) => {

    // if passed featureType and values with set filter values
    if (filter) {
      console.log('setFilter', filter.id, values);
      filter.values = values || [];
    }

    // selecting all filters with values
    const selectedFilters = filters.filter(x => x.values.length > 0);

    // resetting maxLength and values
    setMaxLength(PER_PAGE);
    setValues(filters.map(x => x.values));

    // filtering items
    const filteredItems = items.filter(item => {
      let has = true;
      selectedFilters.forEach(filter => {
        // if (filter !== skipFilter) {
        has = has && filter.match(item);
        // }
      });
      return has;
    });
    setFilteredItems(filteredItems);

    // setting visible items
    const newMaxLength = Math.min(filteredItems.length, maxLength);
    setVisibleItems(filteredItems.slice(0, newMaxLength));
    setHasMore(newMaxLength < filteredItems.length);

    // serializing filters
    let params = {};
    let any = false;
    selectedFilters.forEach(filter => {
      params[filter.id] = filter.values;
      any = true;
    });
    if (!any) {
      params = null;
    }

    replaceParamsSilently(params);

    /*
    if (document && window.history) {
      const url = new URL(window.location.href);
      console.log(url);
      history.replaceState(history.state, document.title, `${url.origin}${url.pathname}?q=${++q}`);
    }
    */

  }, [items, filters]);

  // viewMore is called when user click on "View more" button
  const viewMore = useCallback(() => {
    console.log('viewMore', visibleItems.length, filteredItems.length);
    if (visibleItems.length < filteredItems.length) {
      const newMaxLength = Math.min(visibleItems.length + PER_PAGE, filteredItems.length);
      setVisibleItems(filteredItems.slice(0, newMaxLength));
      setMaxLength(newMaxLength);
      setHasMore(newMaxLength < filteredItems.length);
    }
  }, [maxLength, visibleItems.length, filteredItems.length]);

  // initial call to setFilter
  useEffect(() => {
    console.log('useFilters', values);
    if (ssrItems) {
      return;
    }
    setFilter();
    return () => { };
  }, [items, featureTypes]);

  return { visibleItems, filters, setFilter, values, hasMore, viewMore, total: filteredItems.length };

}
