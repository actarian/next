import { apiGet } from '@core/api/api.service';
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
  const slugs = await apiGet(`/menu/${menu}`);
  return slugs;
}
