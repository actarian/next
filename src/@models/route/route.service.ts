import { getStore } from '@core/store/store.service';
// import { parseMockApi } from '@core/mock/mock.server';
import { Route } from './route';

export async function getRoutes(): Promise<Route[]> {
  const store = await getStore();
  const routes: any[] = await store.route.findMany(); // !!! any
  return routes;
}

export async function getRoute(href: string): Promise<Route | null> {
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

export type StaticPath = { params: { [key: string]: string } };
