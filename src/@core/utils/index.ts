import { IRoute } from '@models/route/route';
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

export function resolveRoute(route: IRoute) {
  console.log('resolveRoute', route.pageSchema);
  const resolver = PAGES[route.pageSchema];
  if (typeof resolver === 'function') {
    return resolver(route);
  }
}

export function asStaticProps(props: any): any {
  return JSON.parse(JSON.stringify(props));
}

export async function awaitAll(array: any, callback: (item: any, index: number) => Promise<any>): Promise<any[]> {
  const promises = array.map(callback);
  return await Promise.all(promises);
}

export function getIsDevelopment(): boolean {
  return process && process.env.NODE_ENV === 'development';
}

export const isDevelopment = getIsDevelopment();
