import type { IEquatable } from '@core/entity/entity';
import type { IFeatureType } from '@models/feature_type/feature_type';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Filter } from './filter';
import { getFilters, setFilters } from './filter.service';

export type FilterParams = { [key: string]: IEquatable[] };
export type FilterValues = IEquatable[][];

export function useFilters<T>(items: T[], featureTypes: IFeatureType[], filterItem: (key: string, item: any, value: IEquatable) => boolean, initialValues?: FilterParams) {
  // console.log('useFilters', params);

  // creating filters with useMemo because is an heavy operation
  const filters = useMemo(() => {
    return getFilters<T>(items, featureTypes, filterItem, initialValues);
  }, [featureTypes, filterItem]);

  const [filteredItems, setFilteredItems] = useState<T[]>(() => setFilters(items, filters));

  // setFilter is called when user select a filter value
  const setFilter = useCallback((filter?: Filter, values?: IEquatable[]) => {
    const filteredItems = setFilters(items, filters, filter, values);
    setFilteredItems(filteredItems);
  }, [items, filters]);

  // initial call to setFilter
  useEffect(() => {
    setFilter();
    return () => { };
  }, [items, featureTypes]);

  return { filteredItems, filters, setFilter };
}
