import { getData } from '@core/data/data.service';
// import { parseMockApi } from '@core/mock/mock.server';
import { Menu } from './menu';

const CACHE: { [key: string]: Menu[] } = {};

export async function getCachedMenu(menu): Promise<Menu[]> {
  if (CACHE[menu]) {
    return CACHE[menu];
  }
  const items = await getMenu(menu);
  CACHE[menu] = items;
  return items;
}

export async function getMenu(menu): Promise<Menu[]> {
  const data = await getData();
  const item = await data.menu.findOne(menu);
  return item ? item.items : null;
  // const items = await parseMockApi(`/api/menu/${menu}`);
  // return items;
}
