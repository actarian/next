import { IEquatable } from '@core/entity/entity';
import { useSearchParams } from '@hooks/useSearchParams/useSearchParams';
import { IFeatureType } from '@models/feature_type/feature_type';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Filter } from './filter';
import { filtersToParams, getFilters } from './filter.service';

export type FilterParams = { [key: string]: IEquatable[] };
export type FilterValues = IEquatable[][];

export function useFilters<T>(items: T[], featureTypes: IFeatureType[], filterItem: (key: string, item: any, value: IEquatable) => boolean, ssrItems?: T[], ssrValues: FilterParams = {}) {

  const { params, replaceParamsSilently } = useSearchParams('filters');
  // console.log('useFilters', params);

  const [filteredItems, setFilteredItems] = useState<T[]>([]);

  // creating filters with useMemo because is an heavy operation
  const filters = useMemo(() => {
    return getFilters<T>(items, featureTypes, filterItem, params);
  }, [featureTypes, filterItem]);

  // setting initial values
  const [values, setValues] = useState<FilterValues>(filters.map(x => x.values));

  // setFilter is called when user select a filter value
  const setFilter = useCallback((filter?: Filter, values?: IEquatable[]) => {

    // if passed featureType and values with set filter values
    if (filter) {
      console.log('setFilter', filter.id, values);
      filter.values = values || [];
    }

    // selecting all filters with values
    const selectedFilters = filters.filter(x => x.values.length > 0);

    // resetting values
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

    // serializing filters
    const params = filtersToParams(filters);
    replaceParamsSilently(params);

    /*
    if (document && window.history) {
      const url = new URL(window.location.href);
      console.log(url);
      history.replaceState(history.state, document.title, `${url.origin}${url.pathname}?q=${++q}`);
    }
    */

  }, [items, filters]);

  // initial call to setFilter
  useEffect(() => {
    console.log('useFilters', values);
    if (ssrItems) {
      return;
    }
    setFilter();
    return () => { };
  }, [items, featureTypes]);

  return { filteredItems, filters, setFilter, values };

}
