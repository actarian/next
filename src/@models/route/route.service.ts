import { getCachedStore } from '@core/store/store.service';
// import { parseMockApi } from '@core/mock/mock.server';
import { Route } from './route';

export async function getRoutes(): Promise<Route[]> {
  const store = await getCachedStore();
  const routes: any[] = await store.route.findMany(); // !!! any
  return routes;
}

export async function getRoute(href): Promise<Route | null> {
  const store = await getCachedStore();
  const routes = await store.route.findMany();
  const route: any = routes.find(x => x.href === href) || null; // !!! any
  // console.log('getRoute', href, '->', route);
  return route;
}
