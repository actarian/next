import type { IEquatable } from '@core';
import type { IFeatureType } from '@models';
import { Filter, FilterMode } from './filter';
import type { FilterParams } from './useFilters';

export function getFilters<T>(items: T[], featureTypes: IFeatureType[], filterMap: (key: string, item: any, value: IEquatable) => boolean, params?: { [key: string]: IEquatable[] }): Filter[] {
  return featureTypes.map(featureType => {
    const filter = Filter.fromFeatureType(featureType, FilterMode.OR);
    filter.filter = (item, value) => {
      if (typeof filterMap === 'function') {
        return filterMap(featureType.id, item, value);
      }
      return false;
    };
    filter.removeInvalidOptions(items);
    if (params && params[filter.id]) {
      filter.values = params[filter.id];
    }
    return filter;
  });
}

export function getFilteredItems<T>(items: T[], selectedFilters: Filter[]): T[] {
  const filteredItems = items.filter(item => {
    let has = true;
    selectedFilters.forEach(filter => {
      has = has && filter.match(item);
    });
    return has;
  });
  return filteredItems;
}

export function setFilters<T>(items: T[], filters: Filter[], filter?: Filter, values?: IEquatable[]): T[] {

  // if passed featureType and values with set filter values
  if (filter) {
    // console.log('setFilter', filter.id, values);
    filter.values = values || [];
  }

  // selecting all filters with values
  const selectedFilters = filters.filter(x => x.values.length > 0);

  // filtering items
  const filteredItems = getFilteredItems<T>(items, selectedFilters);

  // updating filter options
  filters.forEach(filter => {
    const otherFilters = selectedFilters.filter(x => x !== filter);
    const filteredItems = getFilteredItems<T>(items, otherFilters);
    filter.options.forEach(option => {
      let count = 0;
      if (option.id) {
        let i = 0;
        while (i < filteredItems.length) {
          const item = filteredItems[i];
          if (filter.filter(item, option.id)) {
            count++;
          }
          i++;
        }
      } else {
        count = filteredItems.length;
      }
      option.count = count;
      option.disabled = count === 0;
    });
  });

  return filteredItems;
}

export function filtersToParams(filters: Filter[]): FilterParams | null {
  let params: { [key: string]: IEquatable[] } = {};
  let any = false;
  filters.filter(x => x.hasAny()).forEach(filter => {
    params[filter.id] = filter.values;
    any = true;
  });
  if (!any) {
    return null;
  }
  return params;
}
