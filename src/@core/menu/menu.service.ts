import { apiGet } from '@core/api/api.service';

const CACHE: { [key: string]: any[] } = {};

export async function getCachedMenu(menu) {
  if (CACHE[menu]) {
    return CACHE[menu];
  }
  const items = await getMenu(menu);
  CACHE[menu] = items;
  return items;
}

export async function getMenu(menu) {
  const slugs = await apiGet(`/menu/${menu}`);
  return slugs;
}
