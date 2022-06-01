import { IEquatable } from '@core/entity/entity';
import { useSearchParams } from '@hooks/useSearchParams/useSearchParams';
import { IFeatureType } from '@models/feature_type/feature_type';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Filter } from './filter';
import { filtersToParams, getFilters, setFilters } from './filter.service';

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

  // setFilter is called when user select a filter value
  const setFilter = useCallback((filter?: Filter, values?: IEquatable[]) => {

    const filteredItems = setFilters(items, filters, filter, values);
    setFilteredItems(filteredItems);

    // serializing filters
    const params = filtersToParams(filters);
    replaceParamsSilently(params);

  }, [items, filters]);

  // initial call to setFilter
  useEffect(() => {
    if (ssrItems) {
      return;
    }
    setFilter();
    return () => { };
  }, [items, featureTypes]);

  return { filteredItems, filters, setFilter };

}
