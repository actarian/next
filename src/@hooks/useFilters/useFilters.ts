import { IEquatable } from '@core/entity/entity';
import { IFeatureType } from '@models/feature_type/feature_type';
import { ITile } from '@models/tile/tile';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Filter, FilterMode } from './filter';

export const PER_PAGE = 15;

export function useFilters(items: ITile[], featureTypes: IFeatureType[], filterMap: (key: string, item: any, value: IEquatable) => boolean) {

  const initialValues = []; // !!!

  const [maxLength, setMaxLength] = useState(PER_PAGE);
  const [hasMore, setHasMore] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);

  // creating filters with useMemo because is an heavy operation
  const filters = useMemo(() => {
    return featureTypes.map(featureType => {
      const filter = new Filter(featureType, FilterMode.OR);
      filter.filter = (item, value) => {
        if (typeof filterMap === 'function') {
          return filterMap(featureType.id, item, value);
        }
        return false;
      };
      filter.removeInvalidOptions(items);
      return filter;
    });
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
  }, [items, filters]);

  // initial call to setFilter
  useEffect(() => {
    console.log('useFilters', values);
    setFilter();
    return () => { };
  }, [items, featureTypes]);

  return { visibleItems, filters, setFilter, values, hasMore, viewMore, total: filteredItems.length };

}