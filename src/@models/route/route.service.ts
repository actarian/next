import { PAGES } from '@config';
import type { FindParams } from '@core';
import { getStore } from '@core';
import type { ICategory } from '@models';
import { isLocalizedString, localizedToString } from '@models';
// import { parseMockApi } from '@core';
import type { IRoute, IRouteLink } from './route';

export async function getRoutes(params: FindParams = {}): Promise<IRoute[]> {
  const store = await getStore();
  const routes = await store.route.findMany(params);
  return routes;
}

export async function getRoute(id: string): Promise<IRoute | null> {
  const store = await getStore();
  const route = await store.route.findOne(id);
  // console.log('getRoute', id, '->', route);
  return route;
}

export async function getStaticPathsForSchema(schema: string): Promise<StaticPath[]> {
  const store = await getStore();
  const routes = await store.route.findMany({ where: { pageSchema: schema } });
  return routes.map(x => ({ params: { id: x.pageId.toString(), market: x.marketId, locale: x.localeId } }));
}

export async function decorateHref(item: any, market: string = 'ww', locale: string = 'en'): Promise<any> {
  const routes = await getRoutes({ where: { pageSchema: item.schema, pageId: item.id, marketId: market, localeId: locale } });
  const href = routes.length ? routes[0].id : null;
  return { ...item, href };
}

export async function getBreadcrumbFromCategoryTree(categoryTree: ICategory[], market: string = 'ww', locale: string = 'en'): Promise<IRouteLink[]> {
  const routes: IRoute[] = await getRoutes({ where: { marketId: market, localeId: locale } });
  const tree: IRouteLink[] = categoryTree.map(x => {
    const route = x.pageSchema && x.pageId ? routes.find(r =>
      r.pageSchema === x.pageSchema &&
      r.pageId === x.pageId
    ) : null;
    const href = route ? route.id.toString() : undefined;
    let title = x.title;
    if (isLocalizedString(title)) {
      title = localizedToString(title, locale);
    }
    return {
      categoryId: x.id,
      title,
      href,
      items: [],
    }
  });
  return tree;
}

export async function getRouteLinkTree(market: string = 'ww', locale: string = 'en'): Promise<IRouteLink | undefined> {
  const store = await getStore();
  const routes: IRoute[] = await store.route.findMany() as any[];
  const categories: ICategory[] = await store.category.findMany() as any[];
  // console.log(categories);
  /*
  const routes: Route[] = await getRoutes();
  const categories = await getCategories();
  */
  const homeCategory = categories.find(x => x.pageSchema === 'homepage');
  if (homeCategory) {
    const root = categoryToRouteLink(routes, categories, homeCategory, market, locale);
    // console.log('getRouteLinkTree', root);
    return root;
  }
}

export function getChildCategories(routes: IRoute[], categories: ICategory[], category: ICategory, market: string = 'ww', locale: string = 'en'): IRouteLink[] {
  return categories.filter(x => x.categoryId === category.id).map(x => categoryToRouteLink(routes, categories, x, market, locale));
}

export function categoryToRouteLink(routes: IRoute[], categories: ICategory[], category: ICategory, market: string = 'ww', locale: string = 'en'): IRouteLink {
  const route = category.pageSchema && category.pageId ? routes.find(r =>
    r.pageSchema === category.pageSchema &&
    r.pageId === category.pageId &&
    r.marketId === market &&
    r.localeId === locale
  ) : null;
  const href = route ? route.id.toString() : undefined;
  let title = category.title;
  if (isLocalizedString(title)) {
    title = localizedToString(title, locale);
  }
  return {
    categoryId: category.id,
    title,
    href,
    items: getChildCategories(routes, categories, category, market, locale),
  };
}

export function resolveRoute(route: IRoute) {
  // console.log('resolveRoute', route.pageSchema);
  const routepath: string = (PAGES as any)[route.pageSchema];
  return `/${route.marketId}/${route.localeId}/${routepath}/${route.pageId}`;
  /*
  routepath = routepath.replace(/:([^\/]*)/g, (match, p1) => {
    return route[p1];
  });
  return routepath;
  */
}

export type StaticPath = { params: { [key: string]: string } };
