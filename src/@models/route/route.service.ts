import { getData } from '@core/data/data.service';
// import { parseMockApi } from '@core/mock/mock.server';
import { Route } from './route';

export async function getRoutes(): Promise<Route[]> {
  const data = await getData();
  const routes = await data.route.findMany();
  return routes;
}

export async function getRoute(href): Promise<Route | null> {
  const data = await getData();
  const routes = await data.route.findMany();
  const route = routes.find(x => x.href === href) || null;
  // console.log('getRoute', href, '->', route);
  return route;
}
