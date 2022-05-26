import { FindParams } from '@core/entity/entity';
import { getStore } from '@core/store/store.service';
import { ICategory } from '@models/category/category';
import { isLocalizedString, localizedToString } from '@models/locale/locale.service';
// import { parseMockApi } from '@core/mock/mock.server';
import { IRoute, IRouteLink } from './route';

export async function getRoutes(params: FindParams = {}): Promise<IRoute[]> {
  const store = await getStore();
  const routes: any[] = await store.route.findMany(params); // !!! any
  return routes;
}

export async function getRoute(href: string): Promise<IRoute | null> {
  const store = await getStore();
  const routes = await store.route.findMany();
  const route: any = routes.find(x => x.href === href) || null; // !!! any
  // console.log('getRoute', href, '->', route);
  return route;
}

export async function getStaticPathsForSchema(schema: string): Promise<StaticPath[]> {
  const store = await getStore();
  const routes = await store.route.findMany();
  return routes.filter(x => x.pageSchema === schema).map(x => ({ params: { id: x.pageId.toString(), market: x.market, locale: x.locale } }));
}

export async function decorateHref(item: any, market: string = 'ww', locale: string = 'en'): Promise<any> {
  const routes = await getRoutes({ where: { pageSchema: item.schema, pageId: item.id, market, locale } });
  const href = routes.length ? routes[0].href : null;
  return { ...item, href };
}

export async function getBreadcrumbFromCategoryTree(categoryTree: ICategory[], market: string = 'ww', locale: string = 'en'): Promise<IRouteLink[]> {
  const routes: IRoute[] = await getRoutes({ where: { market, locale } });
  return categoryTree.map(x => {
    const route = x.pageSchema && x.pageId ? routes.find(r =>
      r.pageSchema === x.pageSchema &&
      r.pageId === x.pageId
    ) : null;
    const href = route ? route.href : null;
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
}

export async function getRouteLinkTree(market: string = 'ww', locale: string = 'en'): Promise<IRouteLink> {
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
    r.market === market &&
    r.locale === locale
  ) : null;
  const href = route ? route.href : null;
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

export type StaticPath = { params: { [key: string]: string } };
