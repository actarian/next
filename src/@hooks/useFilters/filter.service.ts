import { IEquatable } from "@core/entity/entity";
import { IFeatureType } from "@models/feature_type/feature_type";
import { Filter, FilterMode } from "./filter";
import { FilterParams } from "./useFilters";

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

export function setFilter<T>(items: T[], filters: Filter[], filter?: Filter, values?: IEquatable[]): T[] {

  // if passed featureType and values with set filter values
  if (filter) {
    console.log('setFilter', filter.id, values);
    filter.values = values || [];
  }

  // selecting all filters with values
  const selectedFilters = filters.filter(x => x.values.length > 0);

  // resetting maxLength and values
  /*
  setMaxLength(PER_PAGE);
  setValues(filters.map(x => x.values));
  */

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

  /*
  setFilteredItems(filteredItems);

  // setting visible items
  const newMaxLength = Math.min(filteredItems.length, maxLength);
  setVisibleItems(filteredItems.slice(0, newMaxLength));
  setHasMore(newMaxLength < filteredItems.length);
  */

  return filteredItems;
}

export function filtersToParams(filters: Filter[]): FilterParams {
  let params = {};
  let any = false;
  filters.filter(x => x.hasAny()).forEach(filter => {
    params[filter.id] = filter.values;
    any = true;
  });
  if (!any) {
    params = null;
  }
  return params;
}
