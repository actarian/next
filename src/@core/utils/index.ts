import { IEquatable } from '@core/entity/entity';
import { Route } from '@models/route/route';
import { PAGES } from '../../pages';

export function merge(target, source) {
  // override null values
  if (source === null) {
    return source;
  }
  // assign new values
  if (!target) {
    if (source && typeof source === 'object') {
      return Object.assign({}, source);
    } else {
      return source;
    }
  }
  // merge objects
  if (source && typeof source === 'object') {
    Object.keys(source).forEach(key => {
      const value = source[key];
      if (typeof value === 'object' && !Array.isArray(value)) {
        target[key] = merge(target[key], value);
      } else {
        target[key] = value;
      }
    });
  }
  return target;
}

export function asStaticProps(props: any): any {
  return JSON.parse(JSON.stringify(props));
}

export function asLocalizedPaths(ids: IEquatable[], locales): any {
  let paths;
  if (Array.isArray(locales) && locales.length > 0) {
    paths = [];
    locales.map((locale) => ids.forEach((id) => paths.push({ params: { id: id.toString() }, locale })));
  } else {
    // paths = ids.map((id) => `/product/${id}`);
    paths = ids.map((id) => ({ params: { id: id.toString() } }));
  }
  return paths;
}

export function resolveRoute(route: Route) {
  return PAGES[route.schema](route);
}

export async function awaitAll(array: any, callback: (item: any, index: number) => Promise<any>): Promise<any[]> {
  const promises = array.map(callback);
  return await Promise.all(promises);
}

export function getIsDevelopment(): boolean {
  return process && process.env.NODE_ENV === 'development';
}

export const isDevelopment = getIsDevelopment();
